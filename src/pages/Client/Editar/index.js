import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarClient extends Component {
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
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clients/${id}`)
        .then(data => {
            data.json().then(data => {
                if (data.error) {
                    this.setState({ erro: data.error });
                } else {
                    this.setState({ client: data });
                }
            });
        })
        .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/clients" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Cliente</legend>
                        <div className="client-update">
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
                        <div className="client-update">
                            <label htmlFor="email">E-mail </label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                min="3"
                                max="60"
                                required
                                value={this.state.client.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="client-update">
                            <label htmlFor="address">Endereço </label>
                            <br />
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Endereço"
                                min="3"
                                max="100"
                                required
                                value={this.state.client.address}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="client-update">
                            <label htmlFor="telefone">Telefone </label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="Telefone"
                                min="4"
                                max="13"
                                required
                                value={this.state.client.telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" className="btn btn-primary">
                            Editar
                    </button>
                    </fieldset>
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
    };
 
    handleSubmit = event => {
        const { id } = this.state.client;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clients/${id}`, {
            method: "put",
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
 
export default EditarClient;