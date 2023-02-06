import { IActionEntity } from "./actions.entity";

export interface IProjectsEntity extends IActionEntity {
    title: string,
    tinytitle: string,
    text: string,
    photo?: string,
}