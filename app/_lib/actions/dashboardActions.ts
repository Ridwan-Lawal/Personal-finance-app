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
      message: "Budget category should be 3 or more characters",
    })
    .max(50, { message: "Budget category cannot exceed 50 characters" }),
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

  revalidatePath("/budgets");

  return {
    success: true,
    message: `"${validatedInputs?.category.toUpperCase()}" budget successfully added.`,
  };
}
