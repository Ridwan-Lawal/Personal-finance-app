"use server";

import { createClient } from "@/app/_lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const Budgets = z.object({
  category: z
    .string()
    .min(3, {
      message: "Budget category should be 3 or more characters",
    })
    .max(50, { message: "Budget category cannot exceed 50 characters" }),

  maxSpending: z
    .number()
    .gte(5, { message: "Spendings must be $5 or higher!" })
    .lte(1000000000000, { message: "Spendings must be 1 trillion or lower!" }),

  colorTag: z
    .string()
    .min(3, {
      message: "Budget color tag should be 3 or more characters",
    })
    .max(50, { message: "Budget color tag cannot exceed 50 characters" }),
});

export async function addBudgetAction(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  // Ensuring the user is signed in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed in to call this action :(",
    };
  }

  //   Build the data and ensure inputs safety
  const budgetsInputs = {
    category: formData.get("category"),
    colorTag: formData.get("colorTag"),
    maxSpending: Number(formData.get("maxSpending")),
  };

  const {
    data: validatedInputs,
    error: validationError,
    success: isValidationSuccessful,
  } = Budgets.safeParse(budgetsInputs);

  if (!isValidationSuccessful) {
    return {
      errors: validationError.flatten().fieldErrors,
      inputs: budgetsInputs,
    };
  }

  // Adding new budget
  const { error } = await supabase
    .from("budgets")
    .insert([
      {
        category: validatedInputs?.category,
        maxSpending: validatedInputs?.maxSpending,
        colorTag: validatedInputs?.colorTag,
        userId: user?.id,
      },
    ])
    .select();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/");
  revalidatePath("/budgets");

  return {
    success: true,
    message: `"${validatedInputs?.category.toUpperCase()}" budget successfully added.`,
  };
}

export async function editBudgetAction(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  // Checking if user is signed in...
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed in to call this action!",
    };
  }

  // Check if the budget the user is trying to edit belongs to the user
  const budgetToEditId = formData.get("budgetId");
  const { data: usersData } = await supabase
    .from("budgets")
    .select("*")
    .eq("userId", user?.id);

  const isBudgetForUser = usersData?.some(
    (budget) => budget?.id === budgetToEditId,
  );

  if (!isBudgetForUser) {
    return {
      success: false,
      message: "You are not authorized to edit this budget!",
    };
  }

  // build the data and ensure the input are safe
  const budgetData = {
    category: formData.get("category"),
    maxSpending: Number(formData.get("maxSpending")),
    colorTag: formData.get("colorTag"),
  };

  const {
    data: validatedBudgetData,
    success: isValidationSuccessful,
    error: validatedBudgetError,
  } = Budgets.safeParse(budgetData);

  if (!isValidationSuccessful) {
    return {
      errors: validatedBudgetError?.flatten()?.fieldErrors,
      inputs: budgetData,
    };
  }

  // Editing Budgets...

  const { error } = await supabase
    .from("budgets")
    .update({
      category: validatedBudgetData?.category,
      colorTag: validatedBudgetData?.colorTag,
      maxSpending: validatedBudgetData?.maxSpending,
    })
    .eq("userId", user?.id)
    .eq("id", budgetToEditId as string)
    .select();

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  revalidatePath("/");
  revalidatePath("/budgets");

  return {
    success: true,
    message: `Budget "${validatedBudgetData?.category}" successfully updated!"`,
  };
}

export async function deleteBudgetAction(
  prevState: unknown,
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed in to call this action!",
    };
  }

  // Check if the budget user is trying to delete belong to users

  const budgetToDeleteId = formData.get("budgetId");
  const budgetToDeleteCategory = formData.get("budgetCategory");

  const { data: usersData } = await supabase
    .from("budgets")
    .select("*")
    .eq("userId", user?.id);

  const isBudgetForUser = usersData?.some(
    (budget) => budget?.id === budgetToDeleteId,
  );

  if (!isBudgetForUser) {
    return {
      success: false,
      message: "You are not authorized to delete this data!",
    };
  }

  // Deleting budgets

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("userId", user?.id)
    .eq("id", budgetToDeleteId as string);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/");
  revalidatePath("/budgets");

  return {
    success: true,
    message: `Budget "${budgetToDeleteCategory}" successfully deleted!`,
  };
}
