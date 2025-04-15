"use server";

import { createClient } from "@/app/_lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const Pot = z.object({
  potName: z
    .string()
    .min(2, { message: "Your pot name should have 2 or more characters!" })
    .max(30, { message: "Your pot name cannot exceed 30 characters" }),
  potTarget: z
    .number()
    .gte(5, { message: "Your Pot must be $5 or higher!" })
    .lte(1000000000000, {
      message: "Your pot target must be 1 trillion or lower!",
    }),

  potTheme: z
    .string()
    .min(3, {
      message: "Pot theme should be 3 or more characters",
    })
    .max(50, { message: "Pot theme cannot exceed 50 characters" }),
});

const PotAddMoney = z.object({
  amountToAdd: z
    .number()
    .gte(1, { message: "Your Pot must be $1 or higher!" })
    .lte(1000000000000, {
      message: "Your pot target must be 1 trillion or lower!",
    }),
});

const PotWithdrawMoney = z.object({
  amountToWithdraw: z
    .number()
    .gte(1, { message: "Your Pot must be $1 or higher!" })
    .lte(1000000000000, {
      message: "Your pot target must be 1 trillion or lower!",
    }),
});

export async function addNewPotAction(prevState: unknown, formData: FormData) {
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

  const potInputs = {
    potName: formData.get("potName"),
    potTarget: Number(formData.get("potTarget")),
    potTheme: formData.get("potTheme"),
  };

  const {
    data: potsData,
    success: isValidationSuccessful,
    error: validationError,
  } = Pot.safeParse(potInputs);
  if (!isValidationSuccessful) {
    return {
      errors: validationError?.flatten()?.fieldErrors,
      inputs: potInputs,
    };
  }

  const { error } = await supabase
    .from("pots")
    .insert([
      {
        potName: potsData?.potName,
        potTarget: potsData?.potTarget,
        potTheme: potsData?.potTheme,
        potCurrentBalance: 0,
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

  revalidatePath("/pots");
  revalidatePath("/");

  return {
    success: true,
    message: `Pot "${potsData?.potName}" successfully created!`,
  };
}

export async function editPotAction(prevState: unknown, formData: FormData) {
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

  // Check if pot belongs to user
  const potToEditId = formData.get("potId");
  const { data: userPots } = await supabase
    .from("pots")
    .select("*")
    .eq("userId", user?.id);

  const doesPotBelongToUser = userPots?.some((pot) => pot.id === potToEditId);

  if (!doesPotBelongToUser) {
    return {
      success: false,
      message: "You are not authorized to edit this pot!",
    };
  }

  // Build the data and ensure input safety
  const potInputs = {
    potName: formData.get("potName"),
    potTarget: Number(formData.get("potTarget")),
    potTheme: formData.get("potTheme"),
  };

  const {
    data: potValidatedInputs,
    success: isValidationSuccessful,
    error: validationError,
  } = Pot.safeParse(potInputs);
  if (!isValidationSuccessful) {
    return {
      errors: validationError?.flatten()?.fieldErrors,
      inputs: potInputs,
    };
  }

  const { error } = await supabase
    .from("pots")
    .update({
      potName: potValidatedInputs?.potName,
      potTarget: potValidatedInputs?.potTarget,
      potTheme: potValidatedInputs?.potTheme,
    })
    .eq("userId", user?.id)
    .eq("id", potToEditId as string)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/pots");
  revalidatePath("/");

  return {
    success: true,
    message: `Pot "${potValidatedInputs?.potName.toUpperCase()}" successfully updated!`,
  };
}

export async function deletePotAction(prevState: unknown, formData: FormData) {
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

  //   Checking if pot belong to user

  const potToDeleteId = formData.get("potId");
  const potToDeleteName = formData.get("potName");

  const { data: userPots, error } = await supabase
    .from("pots")
    .select("*")
    .eq("userId", user?.id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const doesPotBelongToUser = userPots?.some((pot) => pot.id === potToDeleteId);

  if (!doesPotBelongToUser) {
    return {
      success: false,
      message: "You are not authorized to delete this pot!",
    };
  }

  const { data: potToDeleteData } = await supabase
    .from("pots")
    .select("potCurrentBalance")
    .eq("userId", user?.id)
    .eq("id", potToDeleteId as string);

  const { error: deleteError } = await supabase
    .from("pots")
    .delete()
    .eq("userId", user?.id)
    .eq("id", potToDeleteId as string);

  if (deleteError) {
    return {
      success: false,
      message: deleteError.message,
    };
  }

  // Getting the user current balance

  const { data: userBalances } = await supabase
    .from("balance")
    .select("current,expenses")
    .eq("userId", user?.id);

  // Deducting the amount from the balance
  const { error: AddToBalanceError } = await supabase
    .from("balance")
    .update({
      current:
        (userBalances?.at(0)?.current ?? 0) +
        (potToDeleteData?.at(0)?.potCurrentBalance ?? 0),
      expenses:
        (userBalances?.at(0)?.expenses ?? 0) -
        (potToDeleteData?.at(0)?.potCurrentBalance ?? 0),
    })
    .eq("userId", user?.id);

  if (AddToBalanceError) {
    return {
      success: true,
      message: `Cash was not added to your balance - ${AddToBalanceError?.message}`,
    };
  }

  revalidatePath("/pots");
  revalidatePath("/");

  return {
    success: true,
    message: `Pot "${potToDeleteName}" successfully deleted!`,
  };
}

export async function addMoneyToPotAction(
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

  //   Checking if pot belong to user
  const potToAddMoneyId = formData.get("potId");
  const potToAddMoneyName = formData.get("potName");

  const { data: userPots, error } = await supabase
    .from("pots")
    .select("*")
    .eq("userId", user?.id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const doesPotBelongToUser = userPots?.some(
    (pot) => pot.id === potToAddMoneyId,
  );

  if (!doesPotBelongToUser) {
    return {
      success: false,
      message: "You are not authorized to delete this pot!",
    };
  }

  // Build the data and ensure the input is safe

  const potsInput = {
    amountToAdd: Number(formData.get("amountToAdd")),
  };

  const {
    data: potsValidatedInput,
    success: isValidationSuccessful,
    error: validationError,
  } = PotAddMoney.safeParse(potsInput);
  if (!isValidationSuccessful) {
    return {
      errors: validationError?.flatten()?.fieldErrors,
      inputs: potsInput,
    };
  }

  //   Get the pot current balance
  const { data: potToAddMoney } = await supabase
    .from("pots")
    .select("potCurrentBalance")
    .eq("userId", user?.id)
    .eq("id", potToAddMoneyId as string);

  // Adding money
  const { error: AddMoneyError } = await supabase
    .from("pots")
    .update({
      potCurrentBalance:
        (potToAddMoney?.at(0)?.potCurrentBalance ?? 0) +
        potsValidatedInput?.amountToAdd,
    })
    .eq("userId", user?.id)
    .eq("id", potToAddMoneyId as string);

  if (AddMoneyError) {
    return {
      success: false,
      message: AddMoneyError.message,
    };
  }

  // Getting the user current balance

  const { data: userBalances } = await supabase
    .from("balance")
    .select("current,expenses")
    .eq("userId", user?.id);

  // Deducting the amount from the balance
  const { error: deductBalanceError } = await supabase
    .from("balance")
    .update({
      current:
        (userBalances?.at(0)?.current ?? 0) - potsValidatedInput?.amountToAdd,
      expenses:
        (userBalances?.at(0)?.expenses ?? 0) + potsValidatedInput?.amountToAdd,
    })
    .eq("userId", user?.id);

  if (deductBalanceError) {
    return {
      success: true,
      message: `Balance was not deducted - ${deductBalanceError?.message}`,
    };
  }

  revalidatePath("/pots");
  revalidatePath("/");

  return {
    success: true,
    message: `$${potsValidatedInput?.amountToAdd} successfully added to pot "${potToAddMoneyName}"`,
  };
}

export async function potWithdrawalAction(
  prevState: unknown,
  formData: FormData,
) {
  const supabase = await createClient();

  // Checking if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      success: false,
      message: "You need to be signed to call this action!",
    };
  }

  // Checking if pot to withraw belong to user
  const potToWithdrawId = formData.get("potId");
  const potToWithdrawName = formData.get("potName");
  const { data: usersPots, error } = await supabase
    .from("pots")
    .select("*")
    .eq("userId", user?.id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const doesPotBelongToUser = usersPots?.some(
    (pot) => pot?.id === potToWithdrawId,
  );

  if (!doesPotBelongToUser) {
    return {
      success: false,
      message: "You are not authorized to withdraw from this pot!",
    };
  }

  // build the data and ensuare type safety
  const potInputs = {
    amountToWithdraw: Number(formData.get("amountToWithdraw")),
  };
  const {
    data: validatedPotData,
    success: isValidationSuccessful,
    error: validationError,
  } = PotWithdrawMoney.safeParse(potInputs);

  if (!isValidationSuccessful) {
    return {
      errors: validationError?.flatten()?.fieldErrors,
      inputs: potInputs,
    };
  }

  // mutating
  const { data: potToWithdraw } = await supabase
    .from("pots")
    .select("potCurrentBalance")
    .eq("userId", user?.id)
    .eq("id", potToWithdrawId as string);

  const { error: potWithdrawError } = await supabase
    .from("pots")
    .update({
      potCurrentBalance: potToWithdraw?.at(0)?.potCurrentBalance
        ? (potToWithdraw?.at(0)?.potCurrentBalance ?? 0) -
          validatedPotData?.amountToWithdraw
        : 0,
    })
    .eq("userId", user?.id)
    .eq("id", potToWithdrawId as string);

  if (potWithdrawError) {
    return {
      success: false,
      message: potWithdrawError?.message,
    };
  }

  // Getting the user current balance

  const { data: userBalances } = await supabase
    .from("balance")
    .select("current,expenses")
    .eq("userId", user?.id);

  // Deducting the amount from the balance
  const { error: AddToBalanceError } = await supabase
    .from("balance")
    .update({
      current:
        (userBalances?.at(0)?.current ?? 0) +
        validatedPotData?.amountToWithdraw,
      expenses:
        (userBalances?.at(0)?.expenses ?? 0) -
        validatedPotData?.amountToWithdraw,
    })
    .eq("userId", user?.id);

  if (AddToBalanceError) {
    return {
      success: true,
      message: `Cash was not added to your balance - ${AddToBalanceError?.message}`,
    };
  }

  revalidatePath("/pots");
  revalidatePath("/");

  return {
    success: true,
    message: `$${validatedPotData?.amountToWithdraw} successfully withdrawn from pot "${potToWithdrawName}"`,
  };
}
