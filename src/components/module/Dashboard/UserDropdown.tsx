"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInfo } from "@/types/user.type";
import { LogOut, User, Key } from "lucide-react";
import Link from "next/link";
import { logoutUserAction } from "@/app/(commonLayout)/(authRouteGroup)/logout/_action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  userInfo: UserInfo;
}


const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon-lg"} className="rounded-full cursor-pointer ring-2 ring-primary overflow-hidden p-0">
          <Avatar className="size-full">
            <AvatarImage src={userInfo.image} alt={userInfo.name} />
            <AvatarFallback className="bg-background text-sm font-semibold select-none">
              {userInfo.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={"end"} className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
            <p className="text-xs text-primary capitalize">
              {userInfo.role.toLowerCase().replace("_", " ")}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href={"/my-profile"} className="flex ">
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href={"/change-password"} className="flex">
            <Key className="mr-2 h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={async () => {
            const toastId = toast.loading("Logging out...",{
              toasterId:"logout"
            });
            try {
              await logoutUserAction();
              toast.success("Logout successful", { id: toastId });
              router.push("/login");
            } catch (error) {
              toast.error("Logout failed", { id: toastId });
            }
          }}
          className="cursor-pointer text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
