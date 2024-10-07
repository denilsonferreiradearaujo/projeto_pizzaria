import prismaCliente from "../../prisma";

class ListCategoryService{
    async execute(){
        const category = await prismaCliente.categoria.findMany({
            select:{
                id: true,
                nome: true,
            }
        })

        return category;
    }
}

export { ListCategoryService };