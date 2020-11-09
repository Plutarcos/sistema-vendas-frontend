import React from 'react';
import Header from '../src/components/header/header';
import Footer from '../src/components/footer/footer';
import Routes from '../src/routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="middle">
        <div className="Cards">
            <Routes />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;