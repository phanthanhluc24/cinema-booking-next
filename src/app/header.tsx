import Link from "next/link";
import { cookies } from "next/headers";
import IdentifyUser from "./server/page";
import ItemHeader from "./item-header";
export default function Header() {
  const cookie = cookies();
  const already = cookie.get("token");
  return (
    <>
      <nav className="bg-slate-700 fixed min-w-full z-10">
        <ul className="flex items-center mx-auto w-2/3 justify-around uppercase h-14 ">
          <ItemHeader/>
          <li>
            {already ? (
              <>
                <IdentifyUser token={already}></IdentifyUser>
              </>
            ) : (
              <p className="ml-6 hover:cursor-pointer hover:animate-shake text-white">
                <Link href="/auth/login/user-login">Login</Link>
              </p>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
