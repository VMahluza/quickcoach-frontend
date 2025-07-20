"use server";

import { gql } from "@apollo/client";
import { getApolloClient } from "@/lib/apollo-client";
import { cookies } from "next/headers";
import { User } from "@/types/user";

const AUTHENTICATE_USER = gql`
    query {
    me {
        id
        username
        email
        firstName
        lastName
        role 
    }
    }
`;

export async function authenticatedUser(): Promise<User> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const client = getApolloClient({
        Authorization: token ? `JWT ${token}` : "",
    });

    const { data } = await client.query({
        query: AUTHENTICATE_USER,
        fetchPolicy: "no-cache",
    });
    return data.me;
}

