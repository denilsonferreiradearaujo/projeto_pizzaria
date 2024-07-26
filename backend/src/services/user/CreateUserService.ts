import prismaCliente from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        
        // Verificar se houve envio do email
        if(!email){
            throw new Error("Email incorrect.")
        }

        // Verificar se o email já existe no banco de dados cadastrado
        const userAlreadyExist = await prismaCliente.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExist){
            throw new Error('User already exist.')   
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaCliente.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService }