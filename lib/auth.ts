import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db('hirenestdb');

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }), // Use the MongoDB adapter
    //...other options
    emailAndPassword: { 
        enabled: true, 
    },
    user: {
       additionalFields: {
          role: {
              type: ["admin", "seeker", "recruiter"],
              input: false
            } 
        }
    },
    baseURL: process.env.BETTER_AUTH_URL, 
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});