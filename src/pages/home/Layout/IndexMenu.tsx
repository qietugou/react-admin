import React from 'react';
import { Menu } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import styles from './menu.less';
import type { MenuDataItem } from '@ant-design/pro-layout';

export type MenuProps = {
  routes: MenuDataItem[];
  route: string;
};
const IndexMenu: React.FC<MenuProps> = ( props ) => {
  const createIconMenuNode = ( type: string ): React.ReactNode => (
    <React.Fragment>
      <i className={ `iconfont qietugou-${ type }` }/>
    </React.Fragment>
  );

  const renderChildScroll = (
    types: string[],
    selectIndex: number,
  ) => (
    <div className={ styles.itemSubsWrapper }>
      <div className={ styles.positioner }>
        <div className={ styles.bonus } style={ { top: `${ selectIndex * 40 }px` } }/>
      </div>
      { types.map(( item, index ) => (
        <div
          className={ `${ styles.subItem } ${ selectIndex === index ? styles.active : '' }` }
          key={ item }
        >
          { item }
        </div>
      )) }
    </div>
  );
  return (
    <React.Fragment>
      <Link to="/">
        <div className={ styles.menuLogo }>
          <i className={ `iconfont qietugou-logo ${ styles.logo }` }/>
        </div>
      </Link>
      <Menu
        theme="light"
        mode="inline"
        className={ styles.menuBody }
        defaultSelectedKeys={ [ props.route ] }
      >
        { props.routes.map(( route, key ) => {
          if (route.hideInMenu) {
            return '';
          }
          return (
            <Menu.Item
              key={ route.path || (`${ key }"+key"` as string) }
              icon={ createIconMenuNode(route.icon as string) }
            >
              <Link to={ route.path || '' }>{ route.name }
              </Link>
              { props.route === "/q/bookmark" && route.path === "/q/bookmark" ?
                <div className={`${styles.itemSubs}`}>
                  { renderChildScroll([ "必看0", "JavaScript", "EastSearch", "React Native", "必看31", "必看244",  "React Native", "必看31", "必看244",   "React Native", "必看31", "必看244"], 0) }
                </div>
                : "" }
            </Menu.Item>
          );
        }) }
      </Menu>
      <div className={ styles.menuFooter }>
        <a className={ styles.host } href="/">
          qietugou.com
        </a>

        <a className={ styles.copyright } href="https://beian.miit.gov.cn/">
          <CopyrightOutlined/> 2021 粤ICP备17166475号
        </a>
        <a
          className={ styles.thanks }
          href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
        >
          <img src="https://www.guaosi.com/assets/img/upyun.png" alt=""/>
          <span>赞助</span>
        </a>
      </div>
    </React.Fragment>
  );
};
export default IndexMenu;
