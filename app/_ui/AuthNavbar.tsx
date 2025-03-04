import Image from "next/image";
import React from "react";
import logo from "@/public/logo-large.svg";
import navIllustration from "@/public/illustration-authentication.svg";

export default function AuthNavbar() {
  return (
    <div className="lg:w-[43%] xl:w-[560px]  lg:p-5">
      {/* mobile auth nav */}
      <div className="bg-grey-900 py-6 px-10 flex items-center justify-center rounded-b-md lg:hidden">
        <Image src={logo} alt="logo" quality={100} priority={true} />
      </div>

      {/* Desktop auth nav */}
      <div className=" items-center justify-center hidden lg:flex">
        {/* illustration */}
        <div className="relative  h-[93vh] w-full top-0  rounded-[12px] overflow-hidden">
          <Image
            src={navIllustration}
            alt="nav illustration "
            quality={100}
            priority={true}
            fill
            className="object-cover"
          />

          {/* logo and text */}
          <div className="absolute p-8 top-0 flex flex-col justify-between h-full bg-black/10">
            <Image
              src={logo}
              alt="logo"
              quality={100}
              priority={true}
              className=""
            />

            <div className="space-y-[20px]  bottom-8">
              <h1 className="text-preset-1 text-white">
                Keep track of your money and save for your future
              </h1>
              <p className="text-preset-4 text-white">
                Personal finance app puts you in control of your spending. Track
                transaction, set budgets and add to savings pots easily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
