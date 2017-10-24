import React, { Component } from 'react';
import $ from 'jquery';

import InputCustomizado from './components/inputCustomizado';
import BotaoSubmitCustomizado from './components/botaoSubmitCustomizado';

export class Formulario extends Component {
    constructor() {
        super();        
        this.state = { nome: '', email: '', senha: '' };

        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(event) {
        event.preventDefault();

        let data = { nome: this.state.nome, email: this.state.email, senha: this.state.senha };
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify(data),
            success: result => this.props.callbackAtualizaListagem(result),
            error: error => console.log(error.responseJSON)
        });
    }

    setNome(event) { this.setState({ nome: event.target.value }) }
    setEmail(event) { this.setState({ email: event.target.value }) }
    setSenha(event) { this.setState({ senha: event.target.value }) }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado type="text" id="nome" label="Nome" value={this.state.nome} onChange={this.setNome} />
                    <InputCustomizado type="email" id="email" label="Email" value={this.state.email} onChange={this.setEmail} />
                    <InputCustomizado type="password" id="senha" label="Senha" value={this.state.senha} onChange={this.setSenha} />

                    <BotaoSubmitCustomizado label="Gravar" />
                </form>
            </div>  
        );
    }
}

export class Tabela extends Component {
    render() {
        return (
            <div>            
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.lista.map(function(item) {
                            return (
                                <tr key={ item.id }>
                                    <td>{ item.nome }</td>
                                    <td>{ item.email }</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table> 
            </div>  
        );
    }
}

export default class AutorBox extends Component {
    constructor() {
        super();        
        this.state = { lista: [] };
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            dataType: 'json',
            success: result => this.setState({ lista: result })
        });
    }

    atualizaListagem(novaLista) {
        this.setState({ lista: novaLista });
    }

    render() {
        return (
            <div className="content" id="content">
                <Formulario callbackAtualizaListagem={this.atualizaListagem.bind(this)} />
                <Tabela lista={this.state.lista} />           
            </div>
        );
    }
}