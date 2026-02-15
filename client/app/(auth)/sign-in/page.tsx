"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import LoginForm from "@/components/login-form";

const Page = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && data?.session && data?.user) {
      router.push("/");
    }
  }, [isPending, data, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (data?.session && data?.user) {
    return null;
  }

  return <LoginForm />;
};

export default Page;
