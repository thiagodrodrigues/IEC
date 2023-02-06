import { Action } from "./actions.enum";

export interface IActionEntity {
    tinytitle: string,
    action: Action,
    createdAt?: Date,
    updatedAt?: Date,
}