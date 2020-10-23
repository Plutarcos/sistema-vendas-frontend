import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarOrder extends Component {

    constructor(props) {
        super(props);
 
        this.state = {
            order: {
                product: "",
                client: "",
                valor: "",
                quantidade: ""
            },
            erro: null,
            redirect: false
        };
    }
 
        
 
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders`)
            .then(order =>
                order.json().then(order => this.setState({ order }))
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
        if (redirect) {
            return <Redirect to="/orders" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Pedido</legend>
                        <div className="order-insert">
                            <label htmlFor="product">Produto </label>
                            <br />
                            <input
                                type="text"
                                id="product"
                                name="product"
                                placeholder="Produto"
                                min="3"
                                max="100"
                                required
                                value={this.state.order.product}
                                onChange={this.handleInputChange}
                            />

                        </div>
                        <div className="order-insert">
                            <label htmlFor="client">Cliente </label>
                            <br />
                            <input
                                type="text"
                                id="client"
                                name="client"
                                placeholder="Cliente"
                                min="3"
                                max="100"
                                required
                                value={this.state.order.client}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="order-insert">
                            <label htmlFor="valor">Valor </label>
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
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
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
