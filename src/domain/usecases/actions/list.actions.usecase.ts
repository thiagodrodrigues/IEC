import { ActionEntity } from "../../entities/actions/type.actions.entity";
import { IActionRepository } from "../../repositories/actions.repository.interface";
import ActionRepository from "../../../adapters/repositories/actions.repository";
import { IUseCase } from "../usecase.interface";

class ListActionUseCase implements IUseCase {
    constructor(private _repository: IActionRepository) {
    }
    async execute(): Promise<ActionEntity[] | undefined> {
        return await this._repository.list();
    }
}

export default new ListActionUseCase(
    ActionRepository
);