import express from 'express';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import readByWhereActionsUsecase from '../../../domain/usecases/actions/readByWhere.actions.usecase';
import { Action } from '../../../domain/entities/actions/actions.enum';

const log: debug.IDebugger = debug('app:actions-middleware');

class actionsMiddleware {
    
    async validateRequiredActionBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        let action = String(Action[0]);
        if(req.body.action == action) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.ACTIONS.MESSAGES.ERROR.VOID_ACTION});
        }
    }

    async validateRequiredTitleBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.action == "Projetos" && req.body.title) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.ACTIONS.MESSAGES.ERROR.VOID_TITLE});
        }
    }


    async validateRequiredTextBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.action == "Projetos" && req.body.text) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.ACTIONS.MESSAGES.ERROR.VOID_TEXT});
        }
    }

    async validateTitleRepeated(req: express.Request, res: express.Response, next: express.NextFunction) {
        let tinytitle = req.body.title.replace(/ /g, '-').toLowerCase();
        const action = await readByWhereActionsUsecase.execute(tinytitle);
        if(!action){
            next();
        } else if(tinytitle == action.tinytitle) {
            next();
        } else {
            res.status(409).send({error: constantsConfig.ACTIONS.MESSAGES.ERROR.TITLE_ALREADY_EXISTS.replace('{USER_ID}', `${tinytitle}`)});
        }
    }

}

export default new actionsMiddleware();