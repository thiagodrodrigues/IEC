import express from 'express';
import listActionsUsecase from '../../../domain/usecases/actions/list.actions.usecase';
import readActionsUsecase from '../../../domain/usecases/actions/read.actions.usecase';
import deleteActionsUsecase from '../../../domain/usecases/actions/delete.actions.usecase';
import createActionsUsecase from '../../../domain/usecases/actions/create.actions.usecase';
import updateActionsUsecase from '../../../domain/usecases/actions/update.actions.usecase';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import jwt  from 'jsonwebtoken';

const log: debug.IDebugger = debug('app:actions-controller');

class ActionsController {

    async getActionById(req: express.Request, res: express.Response) {
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);  
        if(!token){
            res.status(401).send({
                error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {
                const action = await readActionsUsecase.execute({
                    tinytitle: req.params.tinytitle
                });
                res.status(200).send(action);
            }
        }
    }

    async listActions(req: express.Request, res: express.Response) {
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);  
        if(!token){
            res.status(401).send({
                error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {
                const actions = await listActionsUsecase.execute();
                res.status(200).send(actions);
            }
        }
    }

    async createAction(req: express.Request, res: express.Response) {
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);  
        if(!token){
            res.status(401).send({
                error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {
                    const action = await createActionsUsecase.execute(req.body);
                    log(action);
                    res.status(201).send(action);
                }
            }
        } 
    
    async updateAction(req: express.Request, res: express.Response){
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);  
        if(!token){
            res.status(401).send({
                error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {     
                    const actionModel = await updateActionsUsecase.execute({
                        title: req.body.title,
                        tinytitle: req.body.tinytitle,
                        subtitle: req.body.subtitle,
                        text: req.body.text,
                        action: req.body.action,
                        coverPhoto: req.body.coverPhoto,
                        params: req.params.tinytitle
                    });
                    log(actionModel);
                    res.status(200).send(actionModel);
                }
            }
        }
    

    async removeAction(req: express.Request, res: express.Response) {
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);  
        if(!token){
            res.status(401).send({
                error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.ACTIONS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {    
                    const action = await deleteActionsUsecase.execute({
                        tinytitle: req.params.tinytitle
                    });
                    res.status(204).send();
                }
            }
        }
    }


export default new ActionsController();