// services/user/DetailAllUsersService.ts
import prismaCliente from '../../prisma';

class DetailAllUsersService {
  async execute() {
    const users = await prismaCliente.pessoa.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        logins: {
          select: {
            tipoLogin: true,
          },
        },
      },
    });

    return users;
  }
}

export { DetailAllUsersService };
