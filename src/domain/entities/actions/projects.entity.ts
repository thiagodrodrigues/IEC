import { IActionEntity } from "./actions.entity";

export interface IProjectsEntity extends IActionEntity {
    subtitle: string,
    tinysubtitle?: string,
    text: string,
    photoContent?: string,
}