import { Metadata } from "next";
import { getUserInfo } from "@/service/auth.service";
import ProfileView from "@/components/module/Auth/Profile/ProfileView";
import { redirect } from "next/navigation";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect("/login");
  }

  return (
    <div className="p-4 md:p-10 lg:p-12 min-h-screen bg-stone-50/30">
        <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                Your Profile
            </h1>
            <p className="text-muted-foreground mt-2 text-xs font-bold uppercase tracking-[0.2em] opacity-70">
                Manage your account settings and preferences
            </p>
        </div>
        <ProfileView user={userInfo} />
    </div>
  );
};

export const metadata: Metadata = {
  title: "My Profile | Splitease",
  description: "Manage your personal information and account security.",
};

export default MyProfilePage;
