import { cookies } from 'next/headers'

import { Blur } from '@/components/blur'
import { Copyright } from '@/components/copyright'
import { EmptyMemories } from '@/components/empty-memories'
import { Hero } from '@/components/hero'
import { SignIn } from '@/components/signin'
import { Stripes } from '@/components/stripes'
import { Profile } from '@/components/profile'

export default function Home() {
  const isAuthenticated = cookies().has('spacetime_token')

  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        <Blur />

        <Stripes />

        {!isAuthenticated && <SignIn />}
        {isAuthenticated && <Profile />}

        <Hero />

        <Copyright />
      </div>

      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
