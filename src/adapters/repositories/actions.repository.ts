import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { ActionEntity } from "../../domain/entities/actions/type.actions.entity";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IActionRepository } from "../../domain/repositories/actions.repository.interface";
import * as Sequelize from 'sequelize'
import actionModel from '../../infrastructure/persistence/mysql/models/2-actions.models.mysql.db';
import projectModel from '../../infrastructure/persistence/mysql/models/3-projetos.models.mysql.db'
import modelsToEntities from '../../infrastructure/persistence/mysql/helpers/action.modelstoEntities.mysql.DB'
import entitiesToModels from '../../infrastructure/persistence/mysql/helpers/action.entitiestoModel.mysql.DB'

export class ActionRepository implements IActionRepository {
  constructor(
      private _database: IDatabaseModel, 
      private _modelAction: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
      private _modelActionProject: Sequelize.ModelCtor<Sequelize.Model<any, any>>
      ){       
        this._modelAction.hasOne(this._modelActionProject, {
            foreignKey: 'tinytitle',
            as: 'project'
        })
      }

  async readById(resourceId: string): Promise<ActionEntity | undefined> {
      try{
          const actionGeneral = await this._database.read(this._modelAction, resourceId, {
            include: ['project']
          });
          
          return modelsToEntities(actionGeneral);
      } catch(err){
          throw new Error((err as Error).message);
      }
  }

  
  async list(): Promise<ActionEntity[]> {
    try{
    const actionGeneral = await this._database.list(this._modelAction, { include: ['project']});
        const actions = actionGeneral.map(modelsToEntities);
        return actions;
    } catch(err){
        throw new Error((err as Error).message);
    }
    }

  async create(resource: ActionEntity): Promise<ActionEntity> {
      const { actionGeneral, projectGeneral }  = entitiesToModels(resource);
      const actionModel = await this._database.create(this._modelAction, actionGeneral);
      if(projectGeneral){
        const projectModel = await this._database.create(this._modelActionProject, projectGeneral)
      }
      return resource;
  }

  async deleteById(resourceId: string): Promise<void> {
        await this._database.delete(this._modelActionProject, { tinytitle: resourceId})
        await this._database.delete(this._modelAction, { tinytitle: resourceId });
  }

  async updateById(resource: ActionEntity): Promise<ActionEntity | undefined> {
      let tinytitle = resource.title.replace(/ /g, '-').toLocaleLowerCase();
      if(!tinytitle) throw 'Id/Title não fornecido'
      let actModel = await this._database.read(this._modelAction, tinytitle);
      const { actionGeneral } = entitiesToModels(resource);
      await this._database.update(actModel, actionGeneral);
      return resource;
  }

  async readByWhere(resource: string): Promise<ActionEntity | undefined> {
    try{
        const action = await this._database.readByWhere(this._modelAction, {
            tinytitle: resource
        });
        if(action){
            return modelsToEntities(action);
        } 
    } catch(err){
        throw new Error((err as Error).message);
    }
}
}

export default new ActionRepository(
    MysqlDatabase.getInstance(),
    actionModel,
    projectModel
  );