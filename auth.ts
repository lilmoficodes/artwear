export const runtime = 'nodejs'; 
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prismaClientFrontend } from "./app/lib/prismaClientWrapper";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
export const {signIn, signOut, auth, handlers} = NextAuth({
providers : [Credentials({
    credentials : {
        email : {label : "Email", placeholder : "Enter your email here"},
        password : {label : "Password", placeholder : "Enter your password here"}
    }, 
   async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
        console.log("Missing credentials");
        return null;
      }
      console.log("Received credentials:", credentials);
      let User =  await prismaClientFrontend.user.findUnique({
        where : {
            email : credentials.email as string
        }
       })
       if(!User){
        // we dont have to create the user just have say user doesn't exist please signup
        return null
       }
       const isPasswordCorrect = await compare(
        credentials.password as string,
        User.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
      }
        return {
            email : User?.email,
            id : User?.id
        }
    },
}), Google({
    clientId : process.env.AUTH_GOOGLE_ID as string,
    clientSecret : process.env.AUTH_GOOGLE_SECRET as string
})],
pages : {
    signIn : "/login",
    error : "/signup"
},
trustHost : true,
callbacks: {
    async signIn({ user, account }) {
      console.log("The user is", user);
      console.log("The account is", account);
  
      if (account?.provider === "google") {
        const existingUser = await prismaClientFrontend.googleUsers.findUnique({
          where: { email: user.email as string },
        });
  
        if (!existingUser) {
          await prismaClientFrontend.googleUsers.create({
            data: {
              email: user.email!,
              name: user.name || "",
              image: user.image || "",
              provider: account.provider,
            },
          });
        }
      }
      return !!user;
    }
  }
  
})