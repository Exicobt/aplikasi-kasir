import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { order_type_id, orders, name, table } = await request.json(); 

        let customers;

        if (order_type_id === 1) {
            customers = await prisma.customers.create({
                data: {
                    name: name,
                    table: {
                        connect: { table_number: table }
                    }
                }
            });

            await prisma.table.update({
                where: {
                    table_number: table
                },
                data: {
                    status: 'occupied'
                }
            });

        } else {
            customers = await prisma.customers.create({
                data: {
                    name: name
                }
            });
        }

        const newBasket = await prisma.basket.create({
            data: {
                order_type: { connect: { id: order_type_id } },
                orders: {
                    create: orders.map(order => ({
                        menu_id: order.id,
                        qty: order.qty,
                        total: (order.harga * order.qty)
                    }))
                },
                customers: { connect: { id: customers.id } },
            },
            include: {
                order_type: true,
                orders: true,
                customers: true
            }
        });

        await Promise.all(
            orders.map(async (order) => {
                await prisma.menu_stats.upsert({
                where: { menu_id: order.id },
                update: {
                    quantity: {
                    increment: order.qty
                    }
                },
                create: {
                    menu_id: order.id,
                    quantity: order.qty
                }
                });
            })
        );


        console.log("Berhasil menambah data basket dengan orders:", newBasket);

        return new Response(JSON.stringify(newBasket), { status: 201 });

    } catch (err) {
        console.error(err);
        return new Response("Error creating basket", { status: 500 });
    }
}
