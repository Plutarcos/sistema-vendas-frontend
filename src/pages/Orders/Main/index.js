import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            order: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders`)
            .then(order =>
                order.json().then(order => this.setState({ order }))
            )
            .catch(erro => this.setState({ erro }));
    }
    
 
    render() {
        const { order } = this.state;
        let {products} = this.state
        return (
            
            <div className="order-list">
                <Link to={`/criarOrder`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br /> 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((order, index) => (
                            <tr>
                                <th scope="row">{order.id}</th>
                                <button>Novo Produto</button>
                                    {
                                    products.map((val, idx)=> {
                                        let productId = `product-${idx}`
                                        return (
                                        <div key={idx}>
                                            <label htmlFor={productId}>{`Product #${idx + 1}`}</label>
                                            <input
                                            type="text"
                                            name={productId}
                                            data-id={idx}
                                            id={productId}
                                            className="name"
                                            />
                                        </div>
                                        )
                                    })
                                    }
                                <td>{order.product}</td>
                                <td>{order.client}</td>
                                <td>{order.valor}</td>
                                <td>{order.quantidade}</td>
                                <td> <Link to={`/deletarOrder/${order.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    
}
