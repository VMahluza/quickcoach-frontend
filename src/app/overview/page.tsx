import { authenticatedUser } from "../actions";
import { redirect } from "next/navigation";

export default async function OverviewPage() {
    const user = await authenticatedUser();

    if (!user) {
        redirect("/auth/signin"); // Redirect if not authenticated
    }

    return (
        <main>
            <h1>Overview</h1>
            <p>{`Welcome back, ${user.firstName}!`}</p>
        </main>
    );
}