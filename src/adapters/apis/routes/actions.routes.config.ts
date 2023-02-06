import { CommonRoutesConfig } from "./common.routes.config";
import actionsController from "../controllers/action.controller";
import authMiddleware from "../middlewares/auth.middleware";
import coursesMiddleware from "../middlewares/action.middleware";
import express from "express";

export class ActionsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ActionsRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/actions`)
            .all(authMiddleware.check) // verifica se o usuário está logado e retorna o idUser
            .get(actionsController.listActions) // lista todas os cursos do site
        ;
        
        this.app.route('/actions/new')
            .post(
                coursesMiddleware.validateRequiredActionBodyFields, // Verifica se o campo Ação foi preenchido
                coursesMiddleware.validateRequiredTextBodyFields, // Verifica se o campo Texto foi preenchido
                coursesMiddleware.validateRequiredTitleBodyFields, // Verifica se o campo Título foi preenchido
                coursesMiddleware.validateTitleRepeated, // Valida se o título já existe
                actionsController.createAction // Cria novo curso
            )
        ;

        this.app.route(`/actions/:tinytitle`)
            .all(authMiddleware.check) // verifica se o usuário está logado e retorna o idUser
            .get(actionsController.getActionById) // visualizar um curso específico
            .put(
                coursesMiddleware.validateRequiredActionBodyFields, // Verifica se o campo Ação foi preenchido
                coursesMiddleware.validateRequiredTextBodyFields, // Verifica se o campo Texto foi preenchido
                coursesMiddleware.validateRequiredTitleBodyFields, // Verifica se o campo Título foi preenchido
                coursesMiddleware.validateTitleRepeated, // Valida se o título já existe
                actionsController.updateAction // Atualiza curso
            )
            .delete(actionsController.removeAction) // Deleta um curso
        ;

        return this.app;
    }
}