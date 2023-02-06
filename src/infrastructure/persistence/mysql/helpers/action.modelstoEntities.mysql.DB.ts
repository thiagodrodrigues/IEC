import { ActionEntity } from "../../../../domain/entities/actions/type.actions.entity";
import { IProjectsEntity } from "../../../../domain/entities/actions/projects.entity";
import { IActionEntity } from "../../../../domain/entities/actions/actions.entity";

export default function (action:any): ActionEntity | undefined {
    if(!action)
    return;
    let actionGeneral: IActionEntity = {
        title: action.title,
        tinytitle: action.tinytitle,
        action: action.action,
        coverPhoto: action.coverPhoto,
    };

    if(String(actionGeneral.action) == "Projetos"){
        (actionGeneral as IProjectsEntity).tinytitle = action.tinytitle;
        (actionGeneral as IProjectsEntity).subtitle = action.project.subtitle;
        (actionGeneral as IProjectsEntity).tinysubtitle = action.project.tinysubtitle;
        (actionGeneral as IProjectsEntity).photoContent = action.project.photoContent;
        (actionGeneral as IProjectsEntity).text = action.project.text;
    }

    return (actionGeneral as ActionEntity);
}
