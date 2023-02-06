import express from 'express';
import readByWhereUsersUsecase from '../../../domain/usecases/users/readByWhere.users.usecase';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import readUsersUsecase from '../../../domain/usecases/users/read.users.usecase';

const log: debug.IDebugger = debug('app:user-middleware');

class UserMiddleware {
    
    async validateUserRepeated(req: express.Request, res: express.Response, next: express.NextFunction) {
        let email: string = req.body.email;
        let idUsers: number = Number(req.params.idUsers);
        const user = await readByWhereUsersUsecase.execute(req.body);
        if(!user){
            next();
        } else if(email == user.email && idUsers == user.idUsers) {
            next();
        } else {
            res.status(409).send({error: constantsConfig.USERS.MESSAGES.ERROR.USER_ALREADY_EXISTS.replace('{USER_ID}', `${email}`)});
        }
    }

    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await readUsersUsecase.execute({
            idUsers: Number(req.params.idUsers)
        });
        if(user) {
            next();
        } else{
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.USER_NOT_FOUND.replace('{USER_ID}', String(req.params.idUser))})
        }
    }

    async validateRequiredNameBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.name) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.VOID_NAME});
        }
    }

    async validateRequiredEmailBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.email) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.VOID_EMAIL});
        }
    }

    async validateRequiredPasswordBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.password) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.VOID_PASSWORD});
        }
    }


}

export default new UserMiddleware();