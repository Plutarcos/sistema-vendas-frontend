import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Product extends Component {
    state = {
        product: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/products/${id}`)
            .then(product =>
                product.json().then(product => this.setState({ product }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { product } = this.state; 
        return (
            <div className="product-info">
                <h1>Produto: {product.nome} </h1>
                <h1>Custo: {product.preçoCusto} </h1>
                <h1>Valor: {product.preçoVenda} </h1>
                <h1>Quantidade Estoque: {product.quantidadeEstoque} </h1>
                <br />
                <Link to={`/products`}> Voltar </Link> <br />
                <Link to={`/editarProduct/${product.id}`}> Editar </Link> <br />
                <Link to={`/deletarProduct/${product.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
