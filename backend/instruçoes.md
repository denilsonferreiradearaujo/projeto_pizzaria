# Criando projeto de uma pizzaria

### **Criando o projeto Backend**

1 - Crie inicialmente uma pasta com nome de "backend" e abra no terminal do VSCode.

2 - No terminal rode o comando para inicializar a estrutura, que criará o arquivo package.json.
>yarn init -y

3 - No terminal rode o comando, para instalar o type scrypt no ambiente de desenvolvimento.
>yarn add typescript -D

4 - No terminal rode o comando, para instalar o express.
>yarn add express

5 - No terminal rode o comando, para instalar a tipagem para express no ambiente de desenvolvimento.
>yarn add @types/express -D

6 - Agora vamos inicializar o typescript no nosso projeto.
>yarn tsc --init

7 - Crie uma nova pasta, dentro da pasta "backend" com nome de "src", onde ficará maior parte de nossa estrutura.

8 - Crie um arquivo, dentro da pasta "src" com nome de "server.ts", que irá gerenciar o servidor da nossa aplicação.

9 - Crie um arquivo, dentro da pasta "src" com nome de "routes.ts", que ira gerencirs as rotas/acessos da nossa aplicação.

10 - Dentro do arquivo "server.ts", vamos fazer o import do express e realizar as configurações iniciais de acesso a nossa porta da aplicação.

```
import express, { Request, Response, NextFunction } from "express";

const app = express();

app.listen(3333, () => console.log('Servidor online!'))
```

11 - Dentro do arquivo "router.ts", vamos fazer o import do express e realizar as configurações iniciais de acesso e criação das rotas de nossa aplicação. 

```
import { Router, Request, Response } from "express";

// criando a instância do Router
const router = Router();

// Criando uma rota para testar a aplicação inicialmente.
router.get('/user', (req: Request, res: Response) => {
    return res.json({ ok: true })
})

export { router};
```

12 - Dentro do arquivo "server.ts", vamos fazer o import do router que configuramos na etapa anterior, instânciar o app.use atribuido o parametro router e atruibuindo ao express.json() para leitura de Json na aplicação.

```
import express, { Request, Response, NextFunction } from "express";
import { router } from './routes'

const app = express();
app.use(express.json());

app.use(router);

app.listen(3333, () => console.log('Servidor online!'))
```

13 - Para conseguirmos rodar nosso projeto referente aos imports não nativos do NODE, vamos rodar o comando e instalar a bibliote abaixo.
>yarn add ts-node-dev -D

14 - Dentro do arquivo package.json vamos inserir o 'scripts', para conseguimos rodar nossa aplicação com Node rodando o arquivo principal do servidor server.ts.

> "scripts": {"dev": "ts-node-dev src/server.ts"},

```
 {
  "name": "proj-pizza2",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.5.4"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

14 - Para rodar a aplicação rode o comando abaixo no terminal.
> yarn run dev

### **Tratando alguns erro da aplicação**.
15 - Agora vamos instalar no terminal uma biblioteca para nos ajudar com os tratamentos de erros da aplicação.
> yarn add express-async-errors

16 -  Agora dentro do arquivo server.ts, insira abaixo do import do express-async-errors na segunda linha, e no conteúdo colocaremos condicionais no "app.use(err: Error, req: Request, res: Response, next: NextFunction)", para realizarmos algumas validações.
>import 'express-async-errors';

```
import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';

import { router } from './routes'

const app = express();
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction)  => {
    if(err instanceof Error){
        // Se for auma instância do tipo error.
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () => console.log('Servidor online!'))
```

17 - No terminal rode o comando, para instalar o "cors" que possibilitará o acesso de qualquer ip autorizado, possibilitando acesso as nossas rotas.
>yarn add cors

>yarn add @types/cors -D

18 - No aquivo "server.js", realize o import do "cors" e instâncie ele no app.use(cors()).

```
import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes'

const app = express();
app.use(express.json());
app.use(cors())

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction)  => {
    if(err instanceof Error){
        // Se for auma instância do tipo error.
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () => console.log('Servidor online!'))
```

19 - Baixe o insomnia para realizar os testes das requisições.

20 - Baixe o postgreSQL para realizarmos a instalação do banco de dados.

21 - Baixe o Beekeeper para facilitar nossas visualizações as tabelas dos banco de dados.

22 - Abra o pgAdmin do posgresSQL (Digite pgAdim na barra de busca do Windowns), e crie um banco de dados com nome de sua preferencia, no meu caso "pizzaria2".
> Object > Craeate > Database    (Coloque o nome e salve)

23 - No terminal rode o comando para instalar o "prisma", que será um facilitador na parte de criação e manuseio do banco de dados. ORM (Object Relational Mapping).
> yarn add prisma

> yarn add @prisma/client

24 - Agora rode no terminal o comando abaixo para inicializar o prisma, onde ele criará pasta/estrutura padrão com um arquivo dentro schema.prima.
> npx prisma init

25 - Após rodado o comando anterior o mesmo também criou um arquivo dentro da pasta "backend" com nome de ".env", onde ali fica informações da variaveis de ambiente onde precisaremos realizar edições com dados do usuário root do postgres.

Altere : johndoe para seu usuario (meu caso aqui é postgres) <br>
Altere : randompassword sua  para sua senha (meu caso é 1234) <br>
Altere : mydb o nome do seu banco de dados (meu caso é pizzaria2)

**Abaixo forma padrão que o arquivo vem.**
```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

**Abaixo com meu exemplo de alterações.**
```
DATABASE_URL="postgresql://postgres:1234@localhost:5432/pizzaria2?schema=public"
```

26 - Dentro da pasta "src", crie uma pasta com nome de "prisma", e dentro dela um arquivo com nome de index.ts e cole a conteúdo abaixo com as cofigurações iniciais.

```
import { PrismaClient } from '@prisma/client'

const prismaClient =  new PrismaClient();

export default prismaClient;
```

27 - Dentro da pasta "backend", "prisma", no arquivo "schema.prisma", iremos criar as models (tabelas do banco) e rodar o comando abaixo para cria-las no nosso banco de dados.

```
yarn prisma migrate dev
```

Models abaixo:
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id String @id @default(uuid())
  name String
  email String
  password String
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  @@map("users")
}

model category {
  id String @id @default(uuid())
  name String
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  @@map("categories")
  products Product[]
}

model Product {
  id String @id @default(uuid())
  name String
  price String
  description String
  banner String
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  category category @relation(fields: [category_id], references: [id])

  @@map("products")
  category_id String
  items Item[]
}

model Order {
  id String @id @default(uuid())
  table Int
  status Boolean @default(false)
  draft Boolean @default(true)
  name String?
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  @@map("orders")
  items Item[]
}

model Item {
  id String @id @default(uuid())
  amount Int
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  order Order @relation(fields: [order_id], references: [id])
  product Product @relation(fields: [product_id], references: [id])

  @@map("itens")
  order_id String
  product_id String
}
```

28 - Dentro da pasta "src", crie uma nova pasta com nome de "controllers". A mesma será responsável por gerenciar os controladores/classes que requisitarão os serviços de requisição ao banco de dados.

29 - Dentro da pasta "src", crie uma nova pasta com nome de "services". A mesma será responsável por gerenciar os serviçoes/classes que requisitarão os dados e informações do banco de dados, ou algum algoritmo.

30 - Dentro da pasta "controllers", crie uma nova pasta com nome de "user", e dentro da pasta user o arquivo "CreateUserController.ts" e já cole o conteúdo inicial abaixo no arquivo.

```
import { Request, Response } from "express";

class CreateUserController{
    async handle (req: Request, res: Response){

        // Teste abaixo para retorno de um OK no formato JSON.
    
        return response.json({ ok: true })
    }
}

export {CreateUserController}
```

31 - Dentro do arquivo "routes.js", iremos realizar a import do "CreateUserController" que criamos anteriormente, para termos acesso a esse controlador pela sua devida rota.

```
import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle)

export {router};

```

33 - Dentro da pasta "services", crie uma nova pasta com nome de "user", e dentro da pasta user, crie o arquivo "CreateUserService.ts", onde iremos, importar o "prismaCliente", realizar a tipagem através do "interface", após utilizaremos os atributos na classe "CreateUserService" de forma asincrona no método "execute", realizaremos validação do email informado pelo usuário, e realizaremos a inserção no banco de dados através do "prismaClient.user.create".

```
import prismaClient from "../../prisma";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}:UserRequest){

        // Verificar se email foi enviado pelo usuário
        if(!email){
            throw new Error('Informe um email correto.')
        }

        // Verificar se esse email já existe no cadastro
        const userAlreadyExiste = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExiste){
            throw new Error('Email já possui cadastro no banco de dados.')
        }

        // Insere as informações o banco de dados na tabela user
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
            // Selecionando o quer devolver de conteudo em alguma determinada visualização ou validação.
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export {CreateUserService};
```

34 - Agora dentro da pasta controllers, no arquivo "CreateUserContoller.ts", vamos realizar o import do "CreateUserService" e instanciar o mesmo em uma constante, após acessar o metodo "execute", passando os atributos name, email e password para o service.

```
import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle (req: Request, res: Response){

        //Captura o conteúdo passado pelo usuário
        const { name, email, password } = req.body;

        // Criando uma instância do service
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        return res.json(user)
    }
}

export {CreateUserController};
```

35 - No terminal execute o comando abaixo para instalar a biblioteca bcrypt que dará suporte na criptografia da senha do usuário.
> yarn add bcryptjs

> yarn add @types/bcryptjs -D

36 - Dentro do arquivo CreateUserService vamos criar a const "passwordHash" que irá criptografar a senha informada pelo usuário e alterar dentro o password para passwordHash.

>const passwordHash = await hash(password, 8) // Inserindo a criptografia na senha
>password: passwordHash, // Alterando para a senha criptografada

```

const passwordHash = await hash(password, 8) // Inserindo a criptografia na senha

// Insere as informações o banco de dados na tabela user
const user = await prismaClient.user.create({
    data: {
        name: name,
        email: email,
        password: passwordHash, // Alterando para a senha criptografada
    },
    // Selecionando o quer devolver de conteudo
    select: {
        id: true,
        name: true, 
        email: true,
    }
})

```

37 - Dentro da pasta services > user, vamos criar um arquivo com nome de "AuthUserService.ts", onde o mesmo será responsável pela autenticação dos usuários. Insira as cofigurações inicias abaixo no arquivo.

```
import prismaClient from "../../prisma";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        console.log(email);

        return {ok: true}
    }
}

export { AuthUserService }
```

38 - Dentro da pasta controller > user, vamos criar um arquivo com nome de "AuthUserController.ts", onde o mesmo será responsável por passar para o serviço as informações para autenticação do usuário. Realizaremos o import do "AuthUserService" e express, atráves do req.body capturaremos o que o usuario passar (email e senha), e instênciaremos em uma constante o através do "new AuthUserService()", e depois chamaremos com o atributo ".execute".

```
import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController{
    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({
            email,
            password
        })

        return res.json(auth);
    }
}

export { AuthUserController };
```

39 - Dentro da pasta services > user no arquivo AuthUserService, vamos verificar se o email e senha enviado pelo usuário, estão de acordo com o cadastrado no banco de dados.

```
import prismaClient from "../../prisma";
import { compare } from "bcryptjs"; 

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        // Condição caso o email esteja incorreto conforme cadastrado no banco de dados
        if(!user){
            throw new Error('User/passwor incorrect')
        }

        // Usando o compare do bcrypt para descriptografar a senha do banco de dados e comparar com a senha informada pelo usuário.
        const passwordMath = await compare(password, user.password)

        // Verifica a senha que o usuário informou, e traz o informativo de erro caso haja divergência.
        if(!passwordMath){
            throw new Error('User/passwor incorrect')
        }

        return {ok: true}
    }
}

export { AuthUserService }
```

40 - Agora vamos realizar a instação de jwt "jasonwebtoken", que possibilitará tornar nossa aplicação mais segura com autenticação por tokens.
>npm add jasonwebtoken
>npm add @types/jsonwebtoken -D

41 - Agora no vamos gerar uma senha hash no site https://www.md5hashgenerator.com/ e insirir no arquivo ".env" onde fica nossas variáveis de ambiente e instalar o dotenv no terminal.

inserir no arquivo .env
> JWT_SECRET = 98388750f63fac47136942aaf8ac79ce

Instalar no terminal
>Npm add dotenv

42 - Agora na pasta services > user, dentro do arquivo AuthUserService.ts, vamos realizar o import do jasonwebtoken e realizar algumas configurações no arquivo para gerar nosso token.

```
import prismaClient from "../../prisma";
import { compare } from "bcryptjs"; 
import { sign } from "jsonwebtoken"; 

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        // Condição caso o email esteja incorreto conforme cadastrado no banco de dados
        if(!user){
            throw new Error('User/passwor incorrect')
        }

        // Usando o compare do bcrypt para descriptografar a senha do banco de dados e comparar com a informada pelo usuário.
        const passwordMath = await compare(password, user.password)

        // Verifica a senha que o usuário informou, e traz o informativo de erro caso haja divergência.
        if(!passwordMath){
            throw new Error('User/passwor incorrect')
        }

        // Gerando o token para o usuário com os criterio necessario confirme socumentação do JWT
        const token = sign(
            // Passando o payload
            {
                name: user.name,
                email: user.email
            },

            // Passando a senha hash armazenada na variavel de ambiente
            process.env.JWT_SECRET,

            // Passando subject e perioro de expiração do token
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }
```




