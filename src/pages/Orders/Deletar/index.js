import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';
 
class DeletarOrder extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            order: {},
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
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ order: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/orders" />;
        } else {
            return (
                <fieldset>
                    <div className="order-delete">
                        <label htmlFor="nome">{this.state.order.nome} </label>
                        <h1>Tem certeza que deseja deletar este registro?</h1>
 
                        <button
                            onClick={this.handleClick}
                        >
                            Remover
                        </button>
                        <br /><br />
                        <Link to={`/orders`}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders/${id}`, {
            method: "delete"
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
 
export default DeletarOrder;
