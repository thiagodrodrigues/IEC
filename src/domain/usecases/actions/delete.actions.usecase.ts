import { IActionRepository } from "../../repositories/actions.repository.interface";
import ActionRepository from "../../../adapters/repositories/actions.repository";
import { IUseCase } from "../usecase.interface";

class DeleteActionUseCase implements IUseCase {
    constructor(private _repository: IActionRepository) {
    }
    async execute(data: { tinytitle: string }): Promise<void> {
        return await this._repository.deleteById(data.tinytitle);
    }
}

export default new DeleteActionUseCase(
    ActionRepository
);