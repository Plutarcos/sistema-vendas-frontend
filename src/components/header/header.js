import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

//Creates a Header component
const Header = () => (

    
    <header id="main-header">      

          {/*Creates Buttons to navigate between pages */}
        <h2>
            <a href="/clients"><button type="button" class="btn btn-outline-dark">Clientes</button></a>
            <a href="/orders"><button type="button" class="btn btn-outline-dark">Pedidos</button></a>
            <a href="/products"><button type="button" class="btn btn-outline-dark">Produtos</button></a>
        </h2>

    </header>
    
);
 
export default Header;
