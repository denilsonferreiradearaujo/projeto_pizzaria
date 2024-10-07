import prismaCliente from '../../prisma';

class DetailUserService {
  async execute(pessoa_id: number) {
    const user = await prismaCliente.pessoa.findUnique({
      where: {
        id: pessoa_id,  // Busca o usuário pelo `id`
      },
      select: {
        id: true,
        nome: true,
        email: true,
        genero: true,
        cpf: true,
        dataNasc: true,
        status: true,
        enderecos: true,
        telefones: {
          select: {
            Telefone: {
              select: {
                telefoneResidencial: true,
                telefoneCelular: true,
              }
            }
          }
        },
      },
    });

    return user;
  }
}

export { DetailUserService };
