import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import Card from '../../../components/layout/Card'

class CriarProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                nome: "",
                preçoCusto: "",
                preçoVenda: "",
                quantidadeEstoque: ""
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

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/products" />;
        } else {
            return (
                <Card titulo="Adicionar Produto">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="product-insert">
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
                                    value={this.state.product.nome}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="product-insert">
                                <label htmlFor="preçoCusto">Custo </label>
                                <br />
                                <input
                                    type="text"
                                    id="preçoCusto"
                                    name="preçoCusto"
                                    placeholder="Custo"
                                    min="1"
                                    max="9999"
                                    required
                                    value={this.state.product.preçoCusto}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="product-insert">
                                <label htmlFor="preçoVenda">Valor </label>
                                <br />
                                <input
                                    type="text"
                                    id="preçoVenda"
                                    name="preçoVenda"
                                    placeholder="Valor"
                                    min="1"
                                    max="9999"
                                    required
                                    value={this.state.product.preçoVenda}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="product-insert">
                                <label htmlFor="quantidadeEstoque">Quantidade no Estoque </label>
                                <br />
                                <input
                                    type="text"
                                    id="quantidadeEstoque"
                                    name="quantidadeEstoque"
                                    placeholder="Quantidade"
                                    min="1"
                                    max="1000"
                                    required
                                    value={this.state.product.quantidadeEstoque}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Cadastrar
                    </button>
                        </fieldset>
                    </form>
                </Card>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            product: { ...prevState.product, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/products`, {
            method: "post",
            body: JSON.stringify(this.state.product),
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

export default CriarProduct;
