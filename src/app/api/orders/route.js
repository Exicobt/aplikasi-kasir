import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    const orders = await prisma.basket.findMany({
        include: {
            order_type: true,
            customers: {
                include: {
                    table: true
                }
            },
            orders: {
                include: {
                    menu: true,
                }
            }
        }
    })

    return Response.json(orders)
}

export async function POST(req) {

    try {
        const { basket_id, status } = await req.json()

        const statusOrders = await prisma.basket.update({
            where: {
                id: basket_id
            },
            data: {
                status: status
            }
        })

        if(status === 'finish') {
            await prisma.orders.deleteMany({
                where: {
                    basket_id: basket_id
                }
            })

            await prisma.basket.delete({
                where: {
                    id: basket_id
                }
            })
        }

        return new Response(JSON.stringify(statusOrders), { status: 201 })
    } catch(err) {
        console.error(err)
        return new Response("gagal update status order", { status: 500 })
    }
}