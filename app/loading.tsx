import logo from "@/public/logo-loading.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="spinner-container relative h-[120px] w-[120px] md:h-[150px] md:w-[150px]">
        <Image
          src={logo}
          alt="Logo"
          quality={100}
          priority={true}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

// Create a PR
// Metadata
