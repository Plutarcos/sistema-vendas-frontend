import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import Card from '../../../components/layout/Card';


class CriarOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            order: {
                valor: "",
                quantidade: ""
            },
            product: [],
            client: [],
            erro: null,
            redirect: false
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/products`)
            .then(product =>
                product.json().then(product => this.setState({ product }))
            )
            .catch(erro => this.setState({ erro }));

        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders`)
            .then(order =>
                order.json().then(order => this.setState({ order }))
            )
            .catch(erro => this.setState({ erro }));

            fetch(`${process.env.REACT_APP_API_URL}/sistema/clients`)
            .then(client =>
                client.json().then(client => this.setState({ client }))
            )
            .catch(erro => this.setState({ erro }));
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
        const { product } = this.state;
        const { client } = this.state;
        let productList = product.map((product, index) =>
            <option key={product.nome}>{product.nome}</option>
        );
        let clientList = client.map((client, index) =>
            <option key={client.nome}>{client.nome}</option>
        );

        if (redirect) {
            return <Redirect to="/orders" />;
        } else {


            return (

                <div className="Cards">
                    <Card titulo="Tabela de Preços" color='green' >
                        <div className="products-list">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Custo</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Estoque</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((product, index) => (
                                        <tr>
                                            <th scope="row">{product.id}</th>
                                            <td>{product.nome}</td>
                                            <td>{product.preçoCusto}</td>
                                            <td>{product.preçoVenda}</td>
                                            <td>{product.quantidadeEstoque}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </Card>
                    <Card titulo="Fazer Pedido" color='cyan'>
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <div className="order-insert">                                   
                                    <select
                                    id="product"
                                    name="product"
                                    required
                                    value={this.state.order.product}
                                    onChange={this.handleInputChange}
                                    >
                                        {productList}
                                    </select>

                                </div>
                                <div className="order-insert">
                                <select
                                    id="client"
                                    name="client"
                                    required
                                    value={this.state.order.product}
                                    onChange={this.handleInputChange}
                                    >
                                        {clientList}
                                    </select>
                                </div>
                                <div className="order-insert">
                                    <label htmlFor="valor">Valor da venda</label>
                                    <br />
                                    <input
                                        type="text"
                                        id="valor"
                                        name="valor"
                                        placeholder="Valor"
                                        min="1"
                                        max="9999"
                                        required
                                        value={this.state.order.valor}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="order-insert">
                                    <label htmlFor="quantidade">Quantidade </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="quantidade"
                                        name="quantidade"
                                        placeholder="Quantidade"
                                        min="1"
                                        max="1000"
                                        required
                                        value={this.state.order.quantidade}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-outline-dark">
                                    Cadastrar
                    </button>
                            </fieldset>
                        </form>
                    </Card>

                </div >
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            order: { ...prevState.order, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders`, {
            method: "post",
            body: JSON.stringify(this.state.order),
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

export default CriarOrder;
