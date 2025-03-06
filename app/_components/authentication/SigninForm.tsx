"use client";
import { useShowPassword } from "@/app/_hooks/useShowPassword";
import { signinAction } from "@/app/_lib/actions";
import BasicFormField from "@/app/_ui/BasicFormField";
import showIcon from "@/public/icon-show-password.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function SigninForm() {
  const [state, formAction, isSigningIn] = useActionState(signinAction, null);
  const router = useRouter();
  const { showPassword, onShowPassword } = useShowPassword();

  const { errors, inputs } = state ?? {};

  useEffect(() => {
    if (state === null || state === undefined) return;
    else if (state?.success) {
      toast.success(state?.message);
      router.push("/");
    } else if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state, router]);

  return (
    <div className="bg-white  flex flex-col gap-[32px] rounded-[12px] px-5 py-6 max-w-[560px] mx-auto">
      <h1 className="text-preset-1">Sign In</h1>

      <form
        action={formAction}
        className="flex flex-col gap-4"
        autoComplete="on"
      >
        {/* email */}
        <BasicFormField
          htmlFor="email"
          label="Email"
          error={errors?.email?.at(0)}
        >
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            defaultValue={(inputs?.email as string) ?? ""}
            className="basic-input"
            placeholder="Enter your email address"
            disabled={isSigningIn}
            aria-disabled={isSigningIn}
            aria-describedby="emailaddress-error"
            aria-invalid={errors?.email?.at(0) ? true : false}
          />
        </BasicFormField>

        {/* password */}
        <BasicFormField
          htmlFor="password"
          label="Password"
          error={errors?.password?.at(0)}
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            autoComplete="password"
            defaultValue={(inputs?.email as string) ?? ""}
            placeholder="Enter your password"
            className="basic-input"
            disabled={isSigningIn}
            aria-disabled={isSigningIn}
            aria-describedby="password-error"
            aria-invalid={errors?.password?.at(0) ? true : false}
          />

          <div onClick={onShowPassword} className="cursor-pointer">
            <Image
              src={showIcon}
              alt="show password"
              quality={100}
              priority={true}
            />
          </div>
        </BasicFormField>

        <button
          className="btn-auth mt-[32px] cursor-pointer"
          disabled={isSigningIn}
          style={{ opacity: isSigningIn ? 0.5 : 1 }}
        >
          {isSigningIn ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-preset-4 text-grey-500 text-center">
        Need to create an account?{" "}
        <Link href="/user/signup">
          <span className="text-preset-4-bold underline text-grey-900">
            Sign Up
          </span>
        </Link>
      </p>
    </div>
  );
}
// continue with the signup form
