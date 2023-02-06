import { IDatabase } from "./database.interface";

export interface IDatabaseModel extends  IDatabase {
    createModel(name: string, properties: any): any,
    createModelReference(name: string, properties: any): any,
    read(type: any, dataId: number | string, includes?: object): any,
    list(type: any, includes?: object): any,
    listById(type: any, data: any):any,
    readByWhere(type: any, data: any):any,
}