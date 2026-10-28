import { redirect } from "next/navigation";

export default function AdminOrderDetailRedirect() {
  redirect("/admin/orders");
}
