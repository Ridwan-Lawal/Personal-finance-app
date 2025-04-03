import { createClient } from "@/app/_lib/supabase/client";
import { cache } from "react";

export const getBudgets = cache(async function () {
  const supabase = createClient();

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

export async function getBudgetByCategory(category: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to fetch this data!");
  }

  // Getting budgets...
  const { data: budget, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("userId", user?.id)
    .eq("category", category);

  if (error) {
    throw new Error(error?.message);
  }

  return budget;
}

// -=--------=========== POTS ======

export const getPots = cache(async function () {
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
});

export async function getPotById(id: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You need to be signed in to get this pot!");
  }

  const { data: pot, error } = await supabase
    .from("pots")
    .select("potName,potTarget,potTheme")
    .eq("userId", user?.id)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return pot?.at(0);
}
