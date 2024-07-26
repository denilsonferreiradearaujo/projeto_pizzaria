import prismaCliente from "../../prisma";

interface DetailRequest{
    order_id: string
}

class DetailOrderService{
    async execute({order_id}: DetailRequest ){
        const orders = await prismaCliente.item.findMany({
            where:{
                order_id: order_id
            },
            include:{
                product: true,
                order: true,
            }
        })

        return orders;
    }
}

export { DetailOrderService }


