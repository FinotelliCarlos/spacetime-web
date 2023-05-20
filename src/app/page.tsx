import { EmptyMemories } from '@/components/empty-memories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

dayjs.locale(ptBR)

interface Memory {
  coverUrl: string
  createdAt: string
  excerpt: string
  id: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('spacetime_token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('spacetime_token')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const currentDate = (createdAt: string): string => {
    const date = dayjs(createdAt).format('D[ de ]MMMM[, ]YYYY')

    return date
  }

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {currentDate(memory.createdAt)}
            </time>
            <Image
              src={memory.coverUrl}
              className="aspect-video w-full rounded-lg object-cover"
              width={592}
              height={280}
              alt=""
            />

            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <Link
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
              href={`/memories/${memory.id}`}
            >
              Ler mais <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
