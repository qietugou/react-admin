import React, { Component } from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'
import memoryUtils from "../../utils/memoryUtils";
import {reqCategory} from '../../api'
const Item = List.Item
export default class ProductDetail extends Component {
  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
  }

  async componentDidMount () {

    // 得到当前商品的分类ID
    const {pCategoryId, categoryId} = this.props.location.state.product
    if(pCategoryId==='0') { // 一级分类下的商品
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({cName1})
    } else { // 二级分类下的商品
      // 一次性发送多个请求, 只有都成功了, 才正常处理
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }

  }

  /*
 在卸载之前清除保存的数据
 */
  componentWillUnmount () {
    memoryUtils.product = {}
  }
  render() {

    // 读取携带过来的state数据

    console.log(this.props.location.state.product )
    const {name, desc, price, detail, imgs} = this.props.location.state.product  
    const {cName1, cName2} = this.state
    console.log(cName1, cName2)
    const title = (
      <span>
          <Icon
            className="ant-dropdown-link"
            type='arrow-left'
            style={{marginRight: 10, fontSize: 20, color:'#1890ff'}}
            onClick={() => this.props.history.goBack()}
          />

        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    src={img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{__html: detail}}>
            </span>
          </Item>

        </List>
      </Card>
    )
  }
}
