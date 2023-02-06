import { ActionEntity } from "../../../../domain/entities/actions/type.actions.entity";


export default function (action: ActionEntity ){
    let newTitle = action.title.replace(/ /g, "-").toLowerCase();
    const upperTitle = action.title.toUpperCase();
    const actionGeneral = {
        coverPhoto: action.coverPhoto,
        tinytitle: newTitle,
        title: upperTitle,
        action: action.action,
    };

    let projectGeneral = undefined;
    if(String(actionGeneral.action) == "Projetos"){
        const upperSubTitle = action.subtitle.toUpperCase();
        let newsubTitle = action.subtitle.replace(/ /g, "-").toLowerCase();
        projectGeneral = {
            tinytitle: newTitle,
            subtitle: upperSubTitle,
            tinysubtitle: newsubTitle,
            text: action.text,
            photoContent: action.photoContent,
        }
    };

    return {
        projectGeneral: projectGeneral,
        actionGeneral: actionGeneral,
    }
}