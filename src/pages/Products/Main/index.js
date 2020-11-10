import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../../../components/layout/Card';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/products`)
            .then(product =>
                product.json().then(product => this.setState({ product }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { product } = this.state;

        return (
            <div className="product-list">
                <Card titulo="Produtos" color="purple">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Custo</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Estoque</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((product, index) => (
                                <tr>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.nome}</td>
                                    <td>R${product.preçoCusto}</td>
                                    <td>R${product.preçoVenda}</td>
                                    <td>{product.quantidadeEstoque}</td>
                                    <td> <Link to={`/products/${product.id}`}> <button type="button" class="btn btn-outline-dark">Detalhes</button> </Link> </td>
                                    <td> <Link to={`/editarProduct/${product.id}`}> <button type="button" class="btn btn-outline-dark">Editar</button> </Link></td>
                                    <td> <Link to={`/deletarProduct/${product.id}`}> <button type="button" class="btn btn-outline-dark">Excluir</button> </Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to={`/criarProduct`}> <button type="button" class="btn btn-outline-dark">Novo</button> </Link>
                </Card>
            </div>
        )
    }
}
