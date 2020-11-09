import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../../../components/layout/Card';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clients`)
            .then(client =>
                client.json().then(client => this.setState({ client }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { client } = this.state;

        return (
            <div className="client-list">
                <Card titulo="Clientes" color="cyan">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {client.map((client, index) => (
                                <tr>
                                    <th scope="row">{client.id}</th>
                                    <td>{client.nome}</td>
                                    <td>{client.email}</td>
                                    <td>{client.telefone}</td>
                                    <td> <Link to={`/clients/${client.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                    <td> <Link to={`/editarClient/${client.id}`}> <button type="button" class="btn btn-warning">Editar</button> </Link></td>
                                    <td> <Link to={`/deletarClient/${client.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to={`/criarClient`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                </Card>
            </div>
        )
    }
}
