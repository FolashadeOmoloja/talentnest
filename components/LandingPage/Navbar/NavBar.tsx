"use client";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { useSelector } from "react-redux";

export default function Navbar({ activeItem }: { activeItem?: number }) {
  const { user } = useSelector((store: any) => store.auth);
  return (
    <>
      <MainNav activeItem={activeItem} user={user} />
      <MobileNav user={user} />
    </>
  );
}
