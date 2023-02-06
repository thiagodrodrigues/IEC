import express from 'express';
import createUsersUsecase from '../../../domain/usecases/users/create.users.usecase';
import readUsersUsecase from '../../../domain/usecases/users/read.users.usecase';
import deleteUsersUsecase from '../../../domain/usecases/users/delete.users.usecase';
import updateUsersUsecase from '../../../domain/usecases/users/update.users.usecase';
import listUsersUsecase from '../../../domain/usecases/users/list.users.usecase';
import loginUsersUsecase from '../../../domain/usecases/users/login.users.usecase';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {

    async getUserById(req: express.Request, res: express.Response) {
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);
        if(!token){
            res.status(401).send({
                error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {
                const user = await readUsersUsecase.execute({
                    idUsers: Number(req.params.idUsers)
                });
                if(decoded!.admin == true){
                    res.status(200).send(user)
                } else {
                    if(decoded.idUsers !== user!.idUsers){
                        res.status(401).send({
                            error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
                        })
                    } else {
                        res.status(200).send({
                            idUsers: user!.idUsers,
                            name: user!.name,
                            email: user!.email,
                            photo: user!.photo,
                        });
                    }
                }
            }   
        }
    }

    async createUser(req: express.Request, res: express.Response) {
        
        let shufflePass = bcrypt.hashSync(req.body.password,10)
        const user = await createUsersUsecase.execute({
            name: req.body.name,
            email: req.body.email,
            password: shufflePass,
            photo: req.body.photo,
        });
        log(user);
        res.status(201).send({
            idUsers: user!.idUsers,
            name: user!.name,
            email: user!.email,
        });
    }

    async updateUser(req: express.Request, res: express.Response){
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);
        if(!token){
            res.status(401).send({
                error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {            
                const user = await readUsersUsecase.execute({
                    idUsers: Number(req.params.idUsers)
                });
                if(decoded.admin == true){
                    let shufflePass = bcrypt.hashSync(req.body.password,10);
                    const userModel = await updateUsersUsecase.execute({
                        idUsers: user!.idUsers,
                        name: req.body.name,
                        email: req.body.email,
                        password: shufflePass,
                        photo: req.body.photo,
                    });
                    res.status(200).send(userModel);
                } else {
                    if(decoded.idUsers !== user!.idUsers && decoded.idUsers !== 1){
                        res.status(401).send({
                            error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
                        })
                    } else {
                        let shufflePass = bcrypt.hashSync(req.body.password,10);
                        const userModel = await updateUsersUsecase.execute({
                            idUsers: user!.idUsers,
                            name: req.body.name,
                            email: req.body.email,
                            password: shufflePass,
                            photo: req.body.photo,
                        });
                        res.status(200).send(userModel);
                    }
                }
            }
        }
    }


    async removeUser(req: express.Request, res: express.Response) {
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);
        if(!token){
            res.status(401).send({
                error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {

                const User = await deleteUsersUsecase.execute({
                    idUsers: Number(req.params.idUsers)
                });
                res.status(204).send();
            }
        }
    }

    async login(req: express.Request, res: express.Response){
        const user = await loginUsersUsecase.execute(req.body);
        if(user){
            res.status(200).send({
                User: {
                    idUsers: user.user.idUsers,
                    name: user.user.name,
                    email: user.user.email,
                    photo: user.user.photo,
                },
                token: user.token
            });
        } else {
            res.status(401).send({
                error: constantsConfig.USERS.MESSAGES.ERROR.USER_UNAUTHENTICATED
            });
        }
        
    }

    async listUsers(req: express.Request, res: express.Response) {
        const token = req.header(`Authorization`)?.replace(`Bearer `, ``);
        if(!token){
            res.status(401).send({
                error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
            if(typeof decoded == `string`){
                res.status(401).send({
                    error: constantsConfig.USERS.MESSAGES.ERROR.REQUIRE_LOGIN
                });
            } else {
                if(decoded.admin == false){
                    res.status(401).send({
                        error: constantsConfig.USERS.MESSAGES.ERROR.UNAUTHORIZED
                    })
                } else {
                    const users = await listUsersUsecase.execute();
                    res.status(200).send(users);
                }
            }
        }
                
    }

}

export default new UsersController();