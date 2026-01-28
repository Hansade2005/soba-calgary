import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Join SOBA Calgary - Membership Registration",
  description: "Join SOBA Calgary through our membership registration page"
};

export default function SignupPage() {
  // Redirect to membership page since that's where registration happens
  redirect("/membership");
}
