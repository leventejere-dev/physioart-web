import Image from "next/image";
import logoLight from "@/assets/brand/physioart-logo.png";
import logoDark from "@/assets/brand/physioart-logo-dark.png";

export function Logo({ className = "h-10 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src={logoLight}
        alt="PhysioArt"
        className={`${className} dark:hidden`}
        sizes="200px"
        preload={priority}
      />
      <Image
        src={logoDark}
        alt="PhysioArt"
        className={`${className} hidden dark:block`}
        sizes="200px"
      />
    </>
  );
}
