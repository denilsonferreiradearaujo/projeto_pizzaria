import prismaCliente from "../../prisma";

interface ProductResquest{
    category_id: string,
}

class ListByCategoryService{
    async execute({category_id}: ProductResquest){
        const findBycategory = await prismaCliente.product.findMany({
            where:{
                category_id: category_id
            }
        })
    
        return findBycategory;
    }
}

export { ListByCategoryService }



