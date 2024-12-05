'use server'

import { Query, ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUserByEmail = async (email : string) => {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.userCollectionID,
        [
            Query.equal("email", [email])
        ]
    );
    return result.total ? result.documents[0] : null;
}

const handleError = (error: unknown, message: string) => {
    console.error(error, message);
    throw error;
}

export const sendEmailOTP = async ({email}: {email: string})  => {
    const { account } = await createAdminClient();
    try {
        const session = await account.createEmailToken(ID.unique(), email);
        return session.userId;
    }
    catch (error) {
        handleError(error, "Failed to send email OTP");
    }
}

export const createAccount = async ({email, fullName, mobile} : { fullName : string; email: string; mobile: string }) => {
    const existingUser = await getUserByEmail(email);
    const accountID = await sendEmailOTP({ email });
    if (!accountID) {
        throw new Error("Failed to send an OTP!");
    }
    if(!existingUser) {
        const { databases } = await createAdminClient();
        await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            ID.unique(),
            {
                email,
                fullName,
                mobile,
                avatar: "/avatar.svg",
                accountID
            }
        );
    }

    return parseStringify( {accountID});
}

export const verifyOTP = async (accountID: string, otp: string) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession(accountID, otp);
        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        return parseStringify({ sessionId: session.$id });
    }
    catch (error) {
        handleError(error, "Failed to verify OTP");
    }
}

export const getCurrentUser = async () => {
    const { databases, account } = await createSessionClient();
    const result = await account.get();

    const user = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.userCollectionID,
        [
            Query.equal("accountID", [result.$id])
        ]
    );
    if (user.total) {return parseStringify(user.documents[0]);}
    return null;
}


export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountID: existingUser.accountID });
    }

    return parseStringify({ accountID: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
