const statusTexts = [
    'Enviada'
    , 'Aprovada'
    , 'Rejeitada'
    , 'Editada'
];

export default class Status {
    static get SUBMITED() {
        return 0;
    }

    static get APPROVED() {
        return 1;
    }

    static get REJECTED() {
        return 2;
    }

    static get EDITED() {
        return 3;
    }

    static getText(status) {
        if (status >= statusTexts.length - 1 || status < 0) {
            return 'Status inválido';
        } else {
            return statusTexts[status];
        }
    }
}