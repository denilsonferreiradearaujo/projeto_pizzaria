import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
  nome: string;
  email: string;
  senha: string;
  genero: string;
  dataNasc: string;
  cpf: string;
  tipo: string; // tipo da tabela Pessoa
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  telefoneResidencial?: string;
  telefoneCelular?: string;
}


class CreateUserService {
  async execute({
    nome,
    email,
    senha,
    genero,
    dataNasc,
    cpf,
    tipo,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    telefoneResidencial,
    telefoneCelular,
  }: UserRequest) {

    // Verificar se o email foi enviado
    if (!email) {
      throw new Error('Informe um email correto.');
    }

    // Verificar se o CPF foi enviado
    if (!cpf) {
      throw new Error('Informe um CPF.');
    }

    // Verificar se esse email já existe no cadastro
    const userAlreadyExists = await prismaClient.pessoa.findFirst({
      where: { email }
    });

    if (userAlreadyExists) {
      throw new Error('Email já cadastrado.');
    }

    // Criptografando a senha
    const passwordHash = await hash(senha, 8);

    // Verificar se ao menos um telefone foi informado
    if (!telefoneResidencial && !telefoneCelular) {
      throw new Error("Informe ao menos um telefone.");
    }

    // Criar o registro na tabela Pessoa e Login
    const user = await prismaClient.pessoa.create({
      data: {
        nome,
        email,
        genero,
        dataNasc: new Date(dataNasc),
        cpf,
        tipo,
        logins: {
          create: {
            senha: passwordHash,
          }
        },
        enderecos: {
          create: {
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
          }
        },
        telefones: {
          create: [
            telefoneResidencial ? {
              Telefone: {
                create: {
                  telefoneResidencial, // Aqui deve ser telefoneResidencial
                }
              }
            } : null,
            telefoneCelular ? {
              Telefone: {
                create: {
                  telefoneCelular, // Aqui deve ser telefoneCelular
                }
              }
            } : null,
          ].filter(tel => tel !== null) // Filtra telefones vazios
        }
      },
      select: {
        id: true,
        nome: true,
        email: true,
        genero: true,
        dataNasc: true,
        cpf: true,
        logins: {
          select: {
            id: true,
          }
        },
        enderecos: {
          select: {
            id: true,
            cep: true,
            logradouro: true,
            numero: true,
            complemento: true,
            bairro: true,
            cidade: true,
            uf: true,
          }
        },
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
        dataCreate: true,
        dataUpdate: true
      }
    });

    console.log("Resposta do Prisma:", user);
    
    return user;
  }
}

export { CreateUserService };
``
