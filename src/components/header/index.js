import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import { Icon, Breadcrumb, Menu, Modal, Dropdown } from 'antd'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    dayPictureUrl: '', // 天气图片url
    weather: '' // 天气的文本
  }
  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }
  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  getWeather = async () => {
    // 调用接口请求异步获取数据
    const { dayPictureUrl, weather } = await reqWeather('北京')
    // 更新状态
    this.setState({ dayPictureUrl, weather })
  }
  onMenuClick(key) {
    Modal.confirm({
      title: '确定要退出登录么?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.logout()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /*
  第一次render()之后执行一次
  一般在此执行异步操作: 发ajax请求/启动定时器
   */
  componentDidMount() {
    // 获取当前的时间
    this.getTime()
    // 获取当前天气
    this.getWeather()
  }
  /*
  当前组件卸载之前调用
   */
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  render() {
    const title = this.props.headTitle
    const { currentTime, dayPictureUrl, weather } = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span className="menu-icon">
            {' '}
            <Icon type="menu-fold" />
          </span>
           <Dropdown
              overlay={
                <Menu onClick={this.onMenuClick.bind(this)}>
                  <Menu.Item key="1"><LinkButton>退出登录</LinkButton></Menu.Item>
                </Menu>
              }
              className="user-info" placement="bottomRight">
            
              <span className="ant-dropdown-link">
              <img
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              alt="avatar"
            />
              {this.props.user.username}</span>
            </Dropdown>

        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <Breadcrumb>
              <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  {logout}
)(withRouter(Header))
