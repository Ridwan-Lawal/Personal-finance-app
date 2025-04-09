import { TRANSACTION_PER_PAGE } from "@/app/_lib/constant";
import { createClient } from "@/app/_lib/supabase/server";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";

interface QueryData {
  page?: string | undefined;
  category?: string | undefined;
  sortby?: string | undefined;
  search?: string | undefined;
}

export const getTransactions = cache(
  async ({ page, category, sortby, search }: QueryData) => {
    console.log(page, "paaaaaaaaaaaaaaaaaage");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You need to be signed in to fetch this data!");
    }

    // Getting transactions
    let query = supabase
      .from("transactions")
      .select("*")
      .eq("userId", user?.id);

    // Getting total transactions length
    let countQuery = supabase
      .from("transactions")
      .select("*", { count: "exact", head: true })
      .eq("userId", user?.id);

    if (category && category !== "all transactions") {
      query = query.ilike("category", category);

      countQuery = countQuery.ilike("category", category);
    }

    if (search) {
      query = query.ilike("name", `%${search}%`);
      countQuery = countQuery.ilike("name", `%${search}%`);
    }

    if (sortby) {
      if (sortby === "oldest" || sortby === "latest") {
        query = query.order("created_at", {
          ascending: sortby === "latest" ? true : false,
        });
      }
      if (sortby === "A to Z" || sortby === "Z to A") {
        query = query.order("name", {
          ascending: sortby === "A to Z" ? true : false,
        });
      }
      if (sortby === "highest" || sortby === "lowest") {
        query = query.order("amount", {
          ascending: sortby === "lowest" ? true : false,
        });
      }
    }

    const { count: totalTransactions } = await countQuery;

    // Logic for pagination
    if (page && totalTransactions) {
      let from = 0;
      let to = TRANSACTION_PER_PAGE - 1;
      const pageNumbers = Math.ceil(totalTransactions / TRANSACTION_PER_PAGE);

      from = +page * TRANSACTION_PER_PAGE - TRANSACTION_PER_PAGE;

      if (+page === pageNumbers) {
        to = totalTransactions - 1;
      } else {
        to = +page * TRANSACTION_PER_PAGE - 1;
      }

      console.log(from, to, page);

      query = query.range(from, to);
    }

    const { data: transactions, error } = await query;

    if (error) {
      throw new Error(error.message);
    }
    console.log("fetching", page, category);
    return { transactions, totalTransactions };
  },
);

export async function getBase64Image(imageUrl: string | null) {
  try {
    if (imageUrl) {
      const res = await fetch(imageUrl);

      const buffer = await res.arrayBuffer();

      const { base64 } = await getPlaiceholder(Buffer.from(buffer));

      return base64;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export const getBudgets = cache(async function () {
  const supabase = await createClient();

  // Checking if user is signed in...
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to get this data!");
  }

  // Getting data

  const { data: budgets, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("userId", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return budgets;
});

export const getTransactionByCategory = cache(async function (
  category: string | null,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed to get this data!");
  }

  // getting the data
  if (category) {
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("userId", user?.id)
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error?.message);
    }

    return transactions;
  }
});

// ================ POTS ==========

export async function getPots() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You need to be signed to fetch the pots data!");
  }

  const { data: pots, error } = await supabase
    .from("pots")
    .select("*")
    .eq("userId", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return pots;
}

export const getRecurringTransactions = cache(async function () {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You need to be signed in to call this data!");
  }

  const { data: recurringTransactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("userId", user?.id)
    .eq("recurring", true);

  if (error) {
    throw new Error(error.message);
  }

  // Getting latest transaction
  const { data: latestTransaction, error: latestTransactionError } =
    await supabase
      .from("transactions")
      .select("created_at")
      .eq("userId", user?.id)
      .order("created_at", { ascending: false })
      .limit(1);

  if (latestTransactionError) {
    throw new Error(latestTransactionError.message);
  }

  // latest transaction day
  const latestTransactionDate = new Date(
    latestTransaction?.at(0)?.created_at ?? "",
  ).getDate();

  const today = new Date().getDate();

  // if the transaction date is less than today paid is true else false
  const transactionsWithPaidStatus = recurringTransactions?.map(
    (transaction) => ({
      ...transaction,
      paid: new Date(transaction?.date ?? "").getDate() < today,
    }),
  );

  const transactionsAlreadyPaid = transactionsWithPaidStatus.filter(
    (transaction) => transaction?.paid,
  );

  // transaction not paid, and transactions not paid and due in 5 days
  const transactionNotPaid = transactionsWithPaidStatus
    .filter((transaction) => !transaction?.paid)
    .map((transaction) => ({
      ...transaction,
      dueSoon:
        new Date(transaction?.date ?? "").getDate() > latestTransactionDate &&
        new Date(transaction?.date ?? "").getDate() <=
          latestTransactionDate + 5,
    }));

  console.log(
    recurringTransactions,
    transactionsAlreadyPaid,
    transactionNotPaid,
    "yesss",
  );

  return [...transactionsAlreadyPaid, ...transactionNotPaid];
});
