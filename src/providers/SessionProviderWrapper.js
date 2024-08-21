'use client' // This is important to mark this file as a Client Component

import { SessionProvider } from "next-auth/react"

export default function SessionProviderWrapper({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}