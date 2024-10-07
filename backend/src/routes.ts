import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { DetailAllUserController } from "./controllers/user/DetailAllUserController";
import { ForgotPasswordController } from './controllers/user/ForgotPasswordController';
import { ResetPasswordUserController } from './controllers/user/ResetPasswordUserController';

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { UpdateCategoryController } from "./controllers/category/UpdateCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { UpdateProductController } from "./controllers/product/UpdateProductController";

import { CreateTaxaEntregaController } from "./controllers/taxaEntrega/CreateTaxaEntregaController";
import { ListAllTaxaEntregaController } from "./controllers/taxaEntrega/ListAllTaxaEntregaController";
import { UpdateTaxaEntregaController } from "./controllers/taxaEntrega/UpdateTaxaEntregaController";

import { CreatePedidoController } from "./controllers/pedido/CreatePedidoController";
import { ListAllPedidosController } from "./controllers/pedido/ListAllPedidosController";
import { UpdatePedidoStatusController } from "./controllers/pedido/UpdatePedidoStatusController";

// MiddleWares
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAuthorized } from "./middlewares/isAuthorized"; // isAuthorized(['funcionario', 'cliente' ])

const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/users/:pessoa_id', isAuthenticated, new DetailUserController().handle)
router.get('/allUsers', isAuthenticated,  new DetailAllUserController().handle)
router.post('/forgotPassword', new ForgotPasswordController().handle)
router.post('/resetPassword/:token', new ResetPasswordUserController().handle)

// Rotas categoria
router.post('/category' ,new CreateCategoryController().handle)
router.get('/listCategory' ,new ListCategoryController().handle)
router.post('/updateCategory/:id' ,new UpdateCategoryController().handle)

// Rotas produto
router.post('/createProduct', new CreateProductController().handle);
router.get('/listProduct', new ListProductController().handle);
router.post('/updateProduct/:id', new UpdateProductController().handle);

// Rotas taxa de entrega
router.post('/addTaxaEntrega', new CreateTaxaEntregaController().handle);
router.get('/taxasEntrega', new ListAllTaxaEntregaController().handle);
router.post('/updateTaxaEntrega/:id', new UpdateTaxaEntregaController().handle);

// Rotas dos pedidos
router.post('/createPedido', new CreatePedidoController().handle)
router.get('/listPedidos', new ListAllPedidosController().handle);
router.put("/pedido/status/:id", new UpdatePedidoStatusController().handle);


export { router };
