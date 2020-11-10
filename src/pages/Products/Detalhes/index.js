import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import Card from '../../../components/layout/Card';


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
            <div className="Cards">
                <Card titulo={product.nome}>
                    <h1>Custo: R${product.preçoCusto} </h1>
                    <h1>Valor: R${product.preçoVenda} </h1>
                    <h1>Quantidade Estoque: {product.quantidadeEstoque} </h1>
                    <br />
                    <Link to={`/products`}><button type="button" class="btn btn-outline-dark"> Voltar </button> </Link> 
                    <Link to={`/editarProduct/${product.id}`}><button type="button" class="btn btn-outline-dark"> Editar </button> </Link> 
                    <Link to={`/deletarProduct/${product.id}`}><button type="button" class="btn btn-outline-dark"> Deletar </button> </Link> 
                </Card>
            </div >
        );
    }
}
