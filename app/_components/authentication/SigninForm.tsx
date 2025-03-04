"use client";
import BasicFormField from "@/app/_ui/BasicFormField";
import showIcon from "@/public/icon-show-password.svg";
import Image from "next/image";
import Link from "next/link";

export default function SigninForm() {
  return (
    <div className="bg-white  flex flex-col gap-[32px] rounded-[12px] px-5 py-6 max-w-[560px] mx-auto">
      <h1 className="text-preset-1">Sign In</h1>

      <form action="" className="flex flex-col gap-4">
        {/* email */}
        <BasicFormField htmlFor="email" label="Email" error="">
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            defaultValue=""
            className="basic-input"
            placeholder="Enter your email address"
          />
        </BasicFormField>

        {/* password */}
        <BasicFormField htmlFor="password" label="Password" error="">
          <input
            type="text"
            name="password"
            id="password"
            autoComplete="password"
            defaultValue=""
            placeholder="Enter your password"
            className="basic-input"
          />

          <Image
            src={showIcon}
            alt="show password"
            quality={100}
            priority={true}
          />
        </BasicFormField>

        <button className="btn-auth mt-[32px]">Sign in</button>
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
