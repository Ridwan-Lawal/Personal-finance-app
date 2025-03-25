"use client";
import { useShowPassword } from "@/app/_hooks/useShowPassword";
import { signupAction } from "@/app/_lib/actions/authActions";
import BasicFormField from "@/app/_ui/BasicFormField";
import hideIcon from "@/public/icon-hide-password.svg";
import showIcon from "@/public/icon-show-password.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [state, formAction, isSigningUp] = useActionState(signupAction, null);
  const router = useRouter();
  const { showPassword, onShowPassword } = useShowPassword();

  const { errors, inputs } = state ?? {};

  useEffect(() => {
    if (state?.success === null || state?.success === undefined) return;
    if (state?.success) {
      toast.success(state?.message);
      router.push("/");
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state, router]);

  return (
    <div className="mx-auto flex max-w-[560px] flex-col gap-[32px] rounded-[12px] bg-white px-5 py-6">
      <h1 className="text-preset-1">Sign Up</h1>

      <form
        action={formAction}
        className="flex flex-col gap-4"
        autoComplete="on"
      >
        {/* name */}
        <BasicFormField htmlFor="name" label="Name" error={errors?.name?.at(0)}>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            defaultValue={(inputs?.name as string) ?? ""}
            className="basic-input"
            placeholder="Enter your name"
            disabled={isSigningUp}
            aria-disabled={isSigningUp}
            aria-invalid={errors?.name?.at(0) ? true : false}
          />
        </BasicFormField>

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
            defaultValue={inputs?.email as string}
            className="basic-input"
            placeholder="Enter your email address"
            disabled={isSigningUp}
            aria-disabled={isSigningUp}
            aria-invalid={errors?.email?.at(0) ? true : false}
          />
        </BasicFormField>

        {/* password */}
        <BasicFormField
          htmlFor="password"
          label="Create Password"
          error={errors?.password?.at(0)}
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            autoComplete="password"
            defaultValue={(inputs?.password as string) ?? ""}
            placeholder="Create a password"
            className="basic-input"
            disabled={isSigningUp}
            aria-disabled={isSigningUp}
            aria-invalid={errors?.password?.at(0) ? true : false}
          />

          <div onClick={onShowPassword} className="cursor-pointer">
            <Image
              src={showPassword ? hideIcon : showIcon}
              alt="show password"
              quality={100}
              priority={true}
            />
          </div>
        </BasicFormField>

        <button
          className="btn-auth mt-[32px] cursor-pointer"
          style={{ opacity: isSigningUp ? 0.5 : 1 }}
          disabled={isSigningUp}
        >
          {isSigningUp ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-preset-4 text-grey-500 text-center">
        Already have an account?{" "}
        <Link href="/user/signin">
          <span className="text-preset-4-bold text-grey-900 underline">
            Sign in
          </span>
        </Link>
      </p>
    </div>
  );
}
// continue with the signup form
