"use server";

import { cookies } from "next/headers";

export async function signoutUser() {
  // Remove the token cookie
  (await cookies()).delete("token");
  return { success: true };
}