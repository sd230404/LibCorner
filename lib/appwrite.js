import { Client , Account, Avatars , Databases, Query} from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';
export const config={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.jsm.libcorner',
    projectId:'669ba4a9001c68f40720',
    databaseId:'669ba9c700108c77cd71',
    userCollectionId:'669baa140038a0f758bb',
    booksCollectionId:'669baa30002f74da5d3a',
    storageId:'669bb0a50016de3bf5ae'
} 
const client = new Client(); //init react native SDK

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases=new Databases(client);

export const createUser = async (email,password,username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if(!newAccount) throw new Error('Failed to create an account');

        const avatarURL = avatars.getInitials(username);

        await signIn(email,password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountid : newAccount.$id, //$id Property: The $id property is a unique identifier automatically assigned by Appwrite to each new account. This ID is used to uniquely identify the user in the Appwrite database.
                email,
                username,
                avatar:avatarURL
            }
        );

        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email,password) => {
    try {
        const sessions = await account.listSessions();
        if (sessions.total > 0) {
            // If there are existing sessions, return the first one
            return sessions.sessions[0];
        }
        else
        {const session = await account.createEmailPasswordSession(email,password)
        return session;}

        // if (sessions.total > 0){
        //     await account.deleteSession("current")
        //     const session = await account.createEmailPasswordSession(email, password)
        // }else{
        //     const session = await account.createEmailPasswordSession(email, password)
        // }  

        // const currentSession = await account.getSession("current");
        // if (currentSession) return currentSession;
        // const newSession = await account.createEmailPasswordSession(
        //   email,
        //   password
        // );
        // return newSession;

        // if (!account.getSession()){
        //     const session = await account.createEmailPasswordSession(email, password)
        //     return session
        // }else{
        //     await account.deleteSession("current");
        //     const session = await account.createEmailPasswordSession(email, password)
        //     return session
        // }

        // if (sessions.total > 0){
        //     await account.deleteSession("current")
        // }
        // const session = await account.createEmailPasswordSession(email, password) 
        // return session;
    } catch (error) {
        throw new Error(error);
    }

}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

export const getCurrentUser = async() => {
    try {
        const currentAccount = await getAccount();
        if(!currentAccount) throw error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountid',currentAccount.$id)]
        )
        if(!currentUser) throw error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllBooks= async() =>{
    try {
        const books = await databases.listDocuments(
            config.databaseId,
            config.booksCollectionId
        )
        return books.documents;
    } catch (error) {
        throw new Error(error);
    }
}
