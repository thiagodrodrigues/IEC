import { ActionEntity } from "../../entities/actions/type.actions.entity";
import { IActionRepository } from "../../repositories/actions.repository.interface";
import ActionRepository from "../../../adapters/repositories/actions.repository";
import { IUseCase } from "../usecase.interface";

class ReadActionUseCase implements IUseCase {
    constructor(private _repository: IActionRepository) {
    }
    async execute(data: { tinytitle: string }): Promise<ActionEntity | undefined> {
        return await this._repository.readById(data.tinytitle);
    }
}

export default new ReadActionUseCase(
    ActionRepository
);