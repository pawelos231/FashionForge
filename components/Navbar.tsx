import Link from "next/link";
import { buttonVariants } from "@UI/Button";
import SearchBar from "@UI/SearchBar";
import { Icons } from "@UI/Icons";

const mockedLoggedInUser = true;

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />

          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Breadit
          </p>
        </Link>

        <SearchBar />

        {mockedLoggedInUser ? (
          <Link href="/customizer" className="flex gap-2 items-center">
            <p className="hidden text-zinc-700 text-sm font-medium md:block">
              Customizer
            </p>
          </Link>
        ) : (
          <Link href="/register" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
