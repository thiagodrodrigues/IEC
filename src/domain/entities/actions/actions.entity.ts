import { Action } from "./actions.enum";

export interface IActionEntity {
    params?: string,
    tinytitle?: string,
    title: string,
    action: Action,
    coverPhoto: string,
    createdAt?: Date,
    updatedAt?: Date,
}