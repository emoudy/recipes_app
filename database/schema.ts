generator client {
    provider = "prisma-client-js"
  }
  
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  
  model User {
    id       String  @id @default(uuid())
    name     String
    email    String  @unique
    password String
    chatSessions ChatSession[]
    recipes Recipe[]
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  
  model ChatSession {
    id       String  @id @default(uuid())
    name     String
    user     User    @relation(fields: [userId], references: [id])
    userId   String
    messages Message[]
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  
  model Message {
    id             String  @id @default(uuid())
    chatSession    ChatSession @relation(fields: [chatSessionId], references: [id])
    chatSessionId  String
    userInput      String
    aiInput        String
    timestamp      DateTime @default(now())
  }
  
  model Recipe {
    id       String  @id @default(uuid())
    name     String
    category String
    prepTime Int
    user     User    @relation(fields: [userId], references: [id])
    userId   String
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  