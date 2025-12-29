import { createAuthClient } from "better-auth/react"
import { env } from "process"

export const authClient = createAuthClient({
    baseURL: env.BASE_URL,
})


export const { signIn, signUp, useSession, signOut, changePassword } = createAuthClient()