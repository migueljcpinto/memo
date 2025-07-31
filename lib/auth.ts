import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { schema } from "@/db/schema";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "@/components/emails/verification-email";
import PasswordResetEmail from "@/components/emails/reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);


export const auth = betterAuth({
	emailVerification: {
    sendVerificationEmail: async ( { user, url }) => {
    await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [user.email],
    subject: 'Please verify your email',
    react: VerificationEmail({ userName: user.name, verificationUrl: url }),
  });
    },
	sendOnSignUp: true,
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({user, url}) => {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Reset your password',
        react: PasswordResetEmail({ userName: user.name, resetUrl: url }),
      });
    },
    onPasswordReset: async ({ user }) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema
	}),
	 plugins: [nextCookies()]
});
