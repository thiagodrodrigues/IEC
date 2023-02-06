import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { UsersEntity } from "../../domain/entities/users/type.users.entity";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IUsersRepository } from "../../domain/repositories/users.repository.interface";
import * as Sequelize from 'sequelize'
import usersModel from '../../infrastructure/persistence/mysql/models/1-users.models.mysql.db';
import modelsToEntities from '../../infrastructure/persistence/mysql/helpers/users.modelstoEntities.mysql.DB';
import entitiesToModels from '../../infrastructure/persistence/mysql/helpers/users.entitiestoModel.mysql.DB';


export class UsersRepository implements IUsersRepository {
    constructor(
        private _database: IDatabaseModel, 
        private _modelUser: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        ){
        }

    async readById(resourceId: number): Promise<UsersEntity | undefined> {
        try{
            const userGeneral = await this._database.read(this._modelUser, resourceId, {
            });
            
            return modelsToEntities(userGeneral);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }

    async readByWhere(resource: string): Promise<UsersEntity | undefined> {
        try{
            const user = await this._database.readByWhere(this._modelUser, {
                email: resource
            });
            if(user){
                return modelsToEntities(user);
            } else {
                const user = await this._database.readByWhere(this._modelUser, {
                    email: resource
                })
                return modelsToEntities(user);
            }
        } catch(err){
            throw new Error((err as Error).message);
        }
    }

    async create(resource: UsersEntity): Promise<UsersEntity> {
        const { userGeneral }  = entitiesToModels(resource);
        
        const userModel = await this._database.create(this._modelUser, userGeneral);

        return resource;
    }

    async deleteById(resourceId: number): Promise<void> {
        await this._database.delete(this._modelUser, { idUsers: resourceId });
    }

    async list(): Promise<UsersEntity[]> {
        const userGeneral = await this._database.list(this._modelUser);
        const users = userGeneral.map(modelsToEntities);
        return users;
    }

    async updateById(resource: UsersEntity): Promise<UsersEntity | undefined> {
    
        let userModel = await this._database.read(this._modelUser, Number(resource.idUsers));

        const { userGeneral } = entitiesToModels(resource);
        
        await this._database.update(userModel, userGeneral);

        return resource;
    }
}

export default new UsersRepository(
    MysqlDatabase.getInstance(),
    usersModel
    );