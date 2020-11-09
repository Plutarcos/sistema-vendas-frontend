import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import Card from '../../../components/layout/Card';

class CriarClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: {
                nome: "",
                email: "",
                address: "",
                telefone: ""
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/clients" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <Card titulo="Adicionar Cliente" color="green">
                        <fieldset>
                            <div className="client-insert">
                                <label htmlFor="nome">Nome </label>
                                <br />
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.client.nome}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="client-insert">
                                <label htmlFor="email">E-mail </label>
                                <br />
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="E-mail"
                                    minLength="3"
                                    maxLength="60"
                                    required
                                    value={this.state.client.email}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="client-insert">
                                <label htmlFor="address">Endereço </label>
                                <br />
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Endereço"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.client.address}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <div className="client-insert">
                                <label htmlFor="telefone">Telefone </label>
                                <br />
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    placeholder="Telefone"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.client.telefone}
                                    onChange={this.handleInputChange}
                                />
                            </div>


                            <button type="submit" className="btn btn-primary">
                                Cadastrar
                    </button>
                        </fieldset>
                    </Card>
                </form>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            client: { ...prevState.client, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clients`, {
            method: "post",
            body: JSON.stringify(this.state.client),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default CriarClient;
