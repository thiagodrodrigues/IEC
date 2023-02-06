import { CommonRoutesConfig } from "./common.routes.config";
import userController from "../controllers/user.controller";
import userMiddleware from "../middlewares/user.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import express from "express";

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
                    
        this.app.route(`/login`)
            .post(userController.login) // logar um usuário
        ;

        this.app.route(`/users/new`)
            .post(
                userMiddleware.validateRequiredNameBodyFields, // Verifica se o campo Nome foi preenchido
                userMiddleware.validateRequiredEmailBodyFields, // Verifica se o campo Email foi preenchido
                userMiddleware.validateRequiredPasswordBodyFields, // Verifica se o campo Senha é um número
                userMiddleware.validateUserRepeated, // Verifica se o usuário concordou com os termos de uso
                userController.createUser //cadastrar novo usuário
            )
        ; 
    
        this.app.route('/users')
            .all(
                authMiddleware.checkAuthAdmin, // verifica se o usuário está logado e se é Administrador do site
            )
            .get(userController.listUsers) // Lista todos os usuários
        ;

        this.app.route(`/users/:idUsers`)
            .all(
                authMiddleware.checkAuth, // verifica se o usuário está logado e retorna o idUser
                userMiddleware.validateUserExists // verifica se o idUser existe
                ) 
            .get(userController.getUserById) // perfil pessoal do usuário
            .put(
                userMiddleware.validateRequiredNameBodyFields, // Verifica se o campo Nome foi preenchido
                userMiddleware.validateRequiredEmailBodyFields, // Verifica se o campo Email foi preenchido
                userMiddleware.validateRequiredPasswordBodyFields, // Verifica se o campo Senha é um número
                userMiddleware.validateUserRepeated, // Verifica se o usuário concordou com os termos de uso
                userController.updateUser // atualizar um usuário específico
                ) 
            .delete(userController.removeUser) // deletar um usuário específico
        ;

        return this.app;
    }
}