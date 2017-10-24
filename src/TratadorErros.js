import PubSub from 'pubsub-js';

export default class TratadorErros {
    publicarErros(errorList) {

        if ( errorList.status === 400 ) {
            for ( var i=0; i< errorList.errors.length; i++ ) {
                let erro = errorList.errors[i];
                PubSub.publish('erros-formulario', erro);
            }
        }
    }
}