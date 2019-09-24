import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProductHome from './product-home'
import ProductEdit from './product-edit'
import ProductDetail from './product-detail'
import './product.less'
export default class Product extends Component {
  render() {
    return (
      <Switch>
         <Route exact path="/product" component={ProductHome}></Route>
         <Route path="/product/edit" component={ProductEdit}></Route>
         <Route path="/product/detail" component={ProductDetail}></Route>
         <Redirect to="/product"></Redirect>
      </Switch>
    )
  }
}
