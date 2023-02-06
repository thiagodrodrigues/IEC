import { ActionEntity } from "../../entities/actions/type.actions.entity";
import { IActionRepository } from "../../repositories/actions.repository.interface";
import { IUseCase } from "../usecase.interface";
import ActionRepository from "../../../adapters/repositories/actions.repository";

class ReadStringActionUseCase implements IUseCase {
    constructor(private _repository: IActionRepository){
    }
    async execute(resource: string): Promise<ActionEntity | undefined> {
        const action = await this._repository.readById(resource);
        if(action){
            return action
        } 
        return
    }
}

export default new ReadStringActionUseCase(
    ActionRepository
);