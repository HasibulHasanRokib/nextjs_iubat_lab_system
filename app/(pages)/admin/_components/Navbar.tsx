import Image from "next/image";
import Logo from "@/public/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border rounded-md py-2 px-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <Link href={"/admin"}>
            <Image src={Logo} alt="Logo" className="w-14 h-14 cursor-pointer" />
          </Link>
          <p>IUBAT</p>
        </div>
        <div className="flex items-center gap-x-4">
          <Button variant={"outline"}>Logout</Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </div>
  );
}
