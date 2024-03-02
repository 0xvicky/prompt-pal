import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {connectToDB} from "@utils/database";
import User from "@models/user";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({session}) {
      const sessionUser = await User.findOne({
        email: session.user.email
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({profile}) {
      try {
        await connectToDB();
        //chekc if use exist
        const isUserExist = await User.findOne({email: profile.email});

        //if not create new user
        if (!isUserExist) {
          const user = await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          });

          await user.save();
        }
        return true;
      } catch (error) {
        console.log(`Error occured while signin:${error}`);
        return false;
      }
    }
  }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
