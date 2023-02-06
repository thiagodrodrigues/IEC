import { ActionEntity } from "../entities/actions/type.actions.entity";

export interface IActionRepository {
    readById(resourceId: string): Promise<ActionEntity | undefined>,
    create(resource: ActionEntity): Promise<ActionEntity>,
    deleteById(resourceId: string): Promise<void>,
    list(): Promise<ActionEntity[]>,
    updateById(resource: ActionEntity): Promise<ActionEntity | undefined>,
    readByWhere(resource: string): Promise<ActionEntity | undefined>
}