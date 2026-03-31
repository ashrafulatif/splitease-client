import { getUserInfo } from "@/service/auth.service";
import NavbarClient from "./NavbarClient";

export async function Navbar() {
  const userInfo = await getUserInfo();

  return <NavbarClient userInfo={userInfo} />;
}
