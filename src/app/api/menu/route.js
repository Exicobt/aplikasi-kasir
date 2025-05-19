import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    const menus = await prisma.menu.findMany()
    return Response.json(menus)
}

GET()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        process.exit(1)
    })