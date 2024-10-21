'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome, Warrior</CardTitle>
          <CardDescription className="text-center">
            The battlegrounds awaits for you
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button className="w-full" variant="outline" onClick={() => signIn("github", {callbackUrl:"/"})}>
            <FaGithub className="mr-2 h-4 w-4" />
            Enter with GitHub
          </Button>
          <Button className="w-full" variant="outline" onClick={() => signIn("google", {callbackUrl:"/"})}>
            <FaGoogle className="mr-2 h-4 w-4" />
            Enter with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500 text-center">
          Enter the realm of code and take your place among the legends.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}