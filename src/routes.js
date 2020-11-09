import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
//Rotas dos Clientes
import MainClient from './pages/Client/Main';
import DetalhesClient from './pages/Client/Detalhes';
import CriarClient from './pages/Client/Criar';
import EditarClient from './pages/Client/Editar';
import DeletarClient from './pages/Client/Deletar';

//Rotas dos Produtos
import MainProduct from './pages/Products/Main';
import DetalhesProduct from './pages/Products/Detalhes';
import CriarProduct from './pages/Products/Criar';
import EditarProduct from './pages/Products/Editar';
import DeletarProduct from './pages/Products/Deletar';

//Rotas dos Pedidos
import MainOrder from './pages/Orders/Main';
import CriarOrder from './pages/Orders/Criar';
import DeletarOrder from './pages/Orders/Deletar';
 
const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/clients" component={MainClient} />
            <Route path="/clients/:id" component={DetalhesClient} />
            <Route path="/criarClient" component={CriarClient} />
            <Route path="/editarClient/:id" component={EditarClient} />
            <Route path="/deletarClient/:id" component={DeletarClient}/>

            <Route exact path="/products" component={MainProduct} />
            <Route path="/products/:id" component={DetalhesProduct} />
            <Route path="/criarProduct" component={CriarProduct} />
            <Route path="/editarProduct/:id" component={EditarProduct} />
            <Route path="/deletarProduct/:id" component={DeletarProduct}/>

            <Route exact path="/orders" component={MainOrder} />
            <Route exact path="/criarOrder" component={CriarOrder} />
            <Route exact path="/deletarOrder/:id" component={DeletarOrder} /> 
            <Route exact path="/" component={MainOrder} />           


        </Switch>
    </BrowserRouter>
)
 
export default Routes;