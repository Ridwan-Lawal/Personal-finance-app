"use server";

import { balance } from "@/app/_lib/balance.json";
import { createClient } from "@/app/_lib/supabase/server";
import { transactions as transactionsData } from "@/app/_lib/transactions.json";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const User = z.object({
  name: z
    .string({
      required_error: "Name must be a string",
    })
    .min(4, { message: "Name must be at least 3 characters!" })
    .max(100, { message: "Name cannot exceed 100 characters!" }),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email address!" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" })
    .max(50, { message: "Passwords cannot exceed 50 characters!" }),
});

const UserSignin = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email address!" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" })
    .max(50, { message: "Passwords cannot exceed 50 characters!" }),
});

// figure out the type of the prevState, and proceed to the signup form to continue building the form based on the server action

export async function signupAction(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  try {
    //   1. Check if user is logged
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/");
    }

    // 3. Build the data and ensure the inputs are safe

    const userCredential = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const {
      data: userValidatedCredentials,
      error: validationError,
      success: validationSuccess,
    } = User.safeParse(userCredential) ?? {};

    if (!validationSuccess) {
      return {
        errors: validationError?.flatten().fieldErrors,
        inputs: userCredential,
      };
    }

    // step 4. sign up mutation

    const { data, error } = await supabase.auth.signUp({
      email: userValidatedCredentials?.email,
      password: userValidatedCredentials?.password,
      options: {
        data: {
          name: userValidatedCredentials?.name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // Add Demo balances

    const { data: balanceData, error: balanceError } = await supabase
      .from("balance")
      .insert([{ ...balance, userId: data?.user?.id }])
      .select();

    console.log(balanceData, balanceError, "eyyyyyyy");

    if (balanceError) {
      return {
        success: false,
        message: `Balances couldn't be created - ${balanceError?.message}`,
      };
    }

    // add Demo transactions for user
    const { error: transactionsAddError } = await supabase
      .from("transactions")
      .insert(
        transactionsData?.map((transactionData) => ({
          ...transactionData,
          userId: data?.user?.id,
        })),
      )
      .select();

    if (transactionsAddError) {
      return {
        success: false,
        message: `Transaction could'nt be added - ${transactionsAddError?.message}`,
      };
    }

    revalidatePath("/user");

    return {
      success: true,
      message: "Account successfully created!",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  }
}

export async function signinAction(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  try {
    // Step 1: user must be logged out to access this data
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      redirect("/");
    }

    // step 3; build the data and ensure the inputs are safe.
    const userCredential = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const {
      data: userValidatedData,
      error: validationErrors,
      success: isValidationSuccessful,
    } = UserSignin.safeParse(userCredential) ?? {};

    if (!isValidationSuccessful) {
      return {
        errors: validationErrors?.flatten()?.fieldErrors,
        inputs: userCredential,
      };
    }

    // step 4: mutation
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userValidatedData?.email,
      password: userValidatedData?.password,
    });

    console.log(data?.user?.user_metadata);
    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");

    return {
      success: true,
      message: `Welcome back, ${data?.user?.user_metadata?.name}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  }
}
