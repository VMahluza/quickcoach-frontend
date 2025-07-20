"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signoutUser } from "./actions";

export default function SignoutPage() {
  const router = useRouter();

  useEffect(() => {
    signoutUser().then(() => {
      router.replace("/"); // Redirect to homepage
    });
  }, [router]);

  return <div>Signing out...</div>;
}