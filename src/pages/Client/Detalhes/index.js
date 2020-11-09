import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Client extends Component {
    state = {
        client: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clients/${id}`)
            .then(client =>
                client.json().then(client => this.setState({ client }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { client } = this.state;
        
        return (
            <div className="client-info">
                <h1>Cliente: {client.nome} </h1>
                <h1>E-mail: {client.email} </h1>
                <h1>Endereço: {client.address} </h1>
                <h1>Telefone: {client.telefone} </h1>
                <br />
                <Link to={`/clients`}> Voltar </Link> <br />
                <Link to={`/editarClient/${client.id}`}> Editar </Link> <br />
                <Link to={`/deletarClient/${client.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
