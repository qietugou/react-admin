import React, { Component } from 'react'
import { Redirect, Switch, Route} from 'react-router-dom'
import {Layout} from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order/order'
import {connect} from 'react-redux'
import NotFound from '../not-found/not-found'
const {Footer, Sider, Content } = Layout;
class Admin extends Component {
  render() {
    if (!this.props.user || !this.props.user._id) {
      //判断用户已经登陆
      return <Redirect to="/login" />
    }

    return (
      <Layout style={{height:'100%'}}>
      <Sider style={{borderRight:"1px solid #e8e8e8"}} theme="light"><LeftNav></LeftNav></Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{marginTop: "30px",
          backgroundColor: "white"}}>
          <Switch>
          <Redirect exact from='/' to='/home'/>
          <Route path='/home' component={Home}/>
          <Route path='/category' component={Category}/>
          <Route path='/product' component={Product}/>
          <Route path='/role' component={Role}/>
          <Route path='/user' component={User}/>
          <Route path='/charts/bar' component={Bar}/>
          <Route path='/charts/line' component={Line}/>
          <Route path='/charts/pie' component={Pie}/>
          <Route path="/order" component={Order}/>
          <Route component={NotFound}/> {/*上面没有一个匹配, 直接显示*/}
        </Switch>
        </Content>
        <Footer style={{textAlign: "center",
        backgroundColor: "white", padding:"14px 25px",borderTop:"1px solid #e8e8e8"}}>www.qietugou.com</Footer>
      </Layout>
    </Layout>
    )
  }
}
export default connect(
  state => ({user: state.user}),
)(Admin)