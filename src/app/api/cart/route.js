import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(request) {
    try {
        const { type_order, orders } = await request.json()

        const order = await prisma.basket.create({
            data: {
                order_type: type_order,
                orders: orders
            }
        })
        console.log('berhasil menambah data: ', order)
    }
    catch(err) {
        console.error(err)
    }
}