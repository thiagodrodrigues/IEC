import { ActionEntity } from "../../entities/actions/type.actions.entity";
import { IActionRepository } from "../../repositories/actions.repository.interface";
import ActionRepository from "../../../adapters/repositories/actions.repository";
import { IUseCase } from "../usecase.interface";

export class CreateActionUseCase implements IUseCase {
    constructor(private _repository: IActionRepository) {
    }
    async execute(data: ActionEntity): Promise<ActionEntity | undefined> {
        return await this._repository.create(data);
    }
}

export default new CreateActionUseCase(
    ActionRepository
);