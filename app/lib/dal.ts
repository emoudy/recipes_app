import 'server-only'
 
//  Data Access Layer (DAL): The DAL is responsible for interacting with the database.
//  It abstracts the database operations and provides a clean interface for the rest of the application.
//  The DAL can be used to perform CRUD operations, execute queries, and manage transactions.
//  It can also handle data validation and transformation, ensuring that the data is in the correct format before it is stored in the database.
import { auth } from "../../auth";
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { db } from './db/db'
 
export const verifySession = cache(async () => {
  const session = await auth();
 
  if (!session?.user?.id) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.user.id }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
  
  try {
    const data = await db.user.findUnique({
      where: {
        id: Number(session.userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
  
    const user = data
  
    return user
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
})