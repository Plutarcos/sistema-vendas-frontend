import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import Card from '../../../components/layout/Card'

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
            <div className="Cards">
                <Card titulo={client.nome}>
                        <h1>E-mail: {client.email} </h1>
                        <h1>Endereço: {client.address} </h1>
                        <h1>Telefone: {client.telefone} </h1>
                        <br />
                        <Link to={`/clients`}><button type="button" class="btn btn-outline-dark"> Voltar </button></Link> 
                        <Link to={`/editarClient/${client.id}`}><button type="button" class="btn btn-outline-dark"> Editar </button></Link>
                        <Link to={`/deletarClient/${client.id}`}><button type="button" class="btn btn-outline-dark"> Deletar </button></Link> 
                </Card>
            </div>
        );
    }
}
