import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import Card from '../../../components/layout/Card';

class EditarProduct extends Component {
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

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/products/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ product: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/products" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <Card titulo="Editar Produto" color="cyan">
                        <fieldset>
                            <div className="product-update">
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
                            <div className="product-update">
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
                            <div className="product-update">
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
                            <div className="product-update">
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

                            <button type="submit" className="btn btn-outline-dark">
                                Editar
                    </button>
                        </fieldset>
                    </Card>
                </form>
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
    };

    handleSubmit = event => {
        const { id } = this.state.product;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/products/${id}`, {
            method: "put",
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

export default EditarProduct;