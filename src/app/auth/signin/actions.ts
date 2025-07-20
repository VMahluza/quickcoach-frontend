"use server";

import { gql } from "@apollo/client";
import { getApolloClient } from "@/lib/apollo-client";
import { cookies } from "next/headers";

const LOGIN_USER = gql`
    mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
            payload
        }
    }
`;

export async function loginUserAction(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const client = getApolloClient();

    try {
        const { data } = await client.mutate({
            mutation: LOGIN_USER,
            variables: { username, password },
        });
        if (data?.tokenAuth?.token) {

            // Save token in cookie
             (await cookies()).set("token", data.tokenAuth.token, { path: "/" });

            return { success: true };
        }
        return { success: false, error: "Login failed" };
    } catch (error) {
        return { success: false, error: "An unexpected error occurred. Please try again." };
    }
}
