import decode from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): User {
  const token = cookies().get('spacetime_token')?.value

  if (!token) {
    throw new Error('Não autorizado!')
  }

  const user: User = decode(token)

  return user
}
