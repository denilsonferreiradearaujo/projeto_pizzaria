-- CreateTable
CREATE TABLE `Pessoa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `genero` VARCHAR(45) NOT NULL,
    `data_nasc` DATETIME(3) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pessoaId` INTEGER NOT NULL,
    `cep` VARCHAR(8) NOT NULL,
    `logradouro` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(100) NULL,
    `bairro` VARCHAR(45) NOT NULL,
    `cidade` VARCHAR(45) NOT NULL,
    `uf` VARCHAR(45) NOT NULL,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pessoaId` INTEGER NOT NULL,
    `senha` VARCHAR(500) NOT NULL,
    `tipo_login` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(11) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelefonePessoa` (
    `pessoaId` INTEGER NOT NULL,
    `telefoneId` INTEGER NOT NULL,

    PRIMARY KEY (`pessoaId`, `telefoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaxaEntrega` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `distancia_min` INTEGER NOT NULL,
    `distancia_max` INTEGER NOT NULL,
    `valor` DECIMAL(12, 2) NOT NULL,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pessoaId` INTEGER NULL,
    `taxaEntregaId` INTEGER NOT NULL,
    `status` VARCHAR(45) NOT NULL,
    `num_mesa` INTEGER NOT NULL,
    `val_total` DECIMAL(12, 2) NOT NULL,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoriaId` INTEGER NOT NULL,
    `nome` VARCHAR(150) NOT NULL,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtoId` INTEGER NOT NULL,
    `pedidoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `id_valor` INTEGER NOT NULL,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaboresPizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_valor` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tamanho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtoId` INTEGER NOT NULL,
    `tamanho` VARCHAR(45) NOT NULL,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Valor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtoId` INTEGER NOT NULL,
    `preco` DECIMAL(12, 2) NOT NULL,
    `tamanho` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `data_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `pessoaId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Login` ADD CONSTRAINT `Login_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TelefonePessoa` ADD CONSTRAINT `TelefonePessoa_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TelefonePessoa` ADD CONSTRAINT `TelefonePessoa_telefoneId_fkey` FOREIGN KEY (`telefoneId`) REFERENCES `Telefone`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_taxaEntregaId_fkey` FOREIGN KEY (`taxaEntregaId`) REFERENCES `TaxaEntrega`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaboresPizza` ADD CONSTRAINT `SaboresPizza_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tamanho` ADD CONSTRAINT `Tamanho_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Valor` ADD CONSTRAINT `Valor_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `password_reset_tokens_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
