export const appwriteConfig = {
    endpointurl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    userCollectionID: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
    filesCollectionID: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
    bucketID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
    secretKey: process.env.NEXT_APPWRITE_KEY!
};