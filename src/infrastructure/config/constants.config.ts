export default {
    USERS: {
        MESSAGES: {
            ERROR: {
                USER_NOT_FOUND: `Usuário {USER_ID} não encontrado`,
                USER_ALREADY_EXISTS: `Usuário {USER_ID} já existe existe`,
                USER_UNAUTHENTICATED: `Dados incorretos. Usuário não autenticado.`,
                VOID_NAME: `O campo 'Nome' deve ser preenchido`,
                VOID_EMAIL: `O campo 'Email' deve ser preenchido`,
                VOID_PASSWORD: `O campo 'Senha' deve ser preenchido`,
                UNAUTHORIZED: `Usuário logado deve ser igual ao informado no parâmetro. Não autorizado.`,
                REQUIRE_LOGIN: `Você precisa estar logado para executar essa ação.`,
            }
        }
    },
    ACTIONS: {
        MESSAGES: {
            ERROR: {
                REQUIRE_LOGIN: `Faça login para continuar.`,
                VOID_TITLE: `O campo 'Título' deve ser preenchido`,
                VOID_SUBTITLE: `O campo 'SubTítulo' deve ser preenchido`,
                VOID_ACTION: `O campo 'Ação' deve ser um valor pré-definido da lista`,
                VOID_COVERPHOTO: `O campo 'Foto de Capa' deve ser preenchido`,
                VOID_TEXT: `O campo 'Texto' deve ser preenchido`,
                UNAUTHORIZED: `Usuário logado deve ser um administrador para executar esta função. Não autorizado.`,
                TITLE_ALREADY_EXISTS: `Título {USER_ID} já existe existe`,
            }
        }
    }
}