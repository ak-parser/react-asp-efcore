import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Products } from './components/Product/Products';
import { Customers } from './components/Customer/Customers';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/customers' element={<Customers />} />
          </Routes>
      </Layout>
    );
  }
}
