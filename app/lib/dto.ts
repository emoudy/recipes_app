import 'server-only'

// Data Transfer Objects: DTOs are objects that carry data between processes.
// They are used to encapsulate data and send it from one subsystem of an application to another.
// DTOs are often used in APIs to define the structure of the data that is sent and received. 
// They can also limit the data that is sent to the client, preventing them from seeing sensitive information.
import { getUser } from '@/lib/dal'
import { db } from './db/db'
import { auth } from "../../auth";

interface User {
  id: number,
  name: string,
  email: string,
}

function canSeeName(viewer: User) {
  // return viewer?.isAdmin || viewer?.isOwner;
  return true
}
 
function canSeeEmail(viewer: User, team?: string) {
  // return viewer?.isAdmin || viewer?.team === team || viewer?.isOwner;
  return true
}
 
export async function getProfileDTO() {
  const session = await auth();

  const data = await db.user.findMany({
    where: {
			id: Number(session?.user?.id),
		},
    select: {
      id: true,
      name: true,
      email: true,
    }
  })

  const currentUser = await getUser();
  if (!currentUser) return null;
  return {
    name: canSeeName(currentUser) ? currentUser.name : null,
    email: canSeeEmail(currentUser) ? currentUser.email : null,
  }
}