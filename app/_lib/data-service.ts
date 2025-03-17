import { createClient } from "@/app/_lib/supabase/server";
import { getPlaiceholder } from "plaiceholder";

interface FilterProps {
  search: string | undefined | string[];
  sortBy?: string | undefined | string[];
  category: string | undefined | string[];
}

export async function getTransactions({
  search,
  category,
  sortBy,
}: FilterProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Ensuring user is logged in
  if (!user) {
    throw new Error("You need to be signed in to get this data!");
  }

  // Getting data ...

  let query = supabase.from("transactions").select("*");

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,category.ilike.%${search}%,amount.eq.${Number(search)}`,
    );
  }

  if (category) {
    query = query.or(`category.ilike.%${category}%`);
  }

  if (sortBy) {
    if (sortBy === "oldest" || sortBy === "latest") {
      query = query.order("created_at", {
        ascending: sortBy === "latest" ? true : false,
      });
    }
    if (sortBy === "A to Z" || sortBy === "Z to A") {
      query = query.order("name", {
        ascending: sortBy === "A to Z" ? true : false,
      });
    }
    if (sortBy === "highest" || sortBy === "lowest") {
      query = query.order("amount", {
        ascending: sortBy === "lowest" ? true : false,
      });
    }
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
}

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
