import React, { useRef, useState } from 'react';
import { Menu } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import styles from './menu.less';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { useModel } from '@@/plugin-model/useModel';
import _ from 'lodash';

export type MenuProps = {
  routes: MenuDataItem[];
  route: string;
};
const IndexMenu: React.FC<MenuProps> = (props) => {
  const { globalState, handleSelectTagId } = useModel('index.global');

  const ref = useRef<HTMLDivElement>(null);
  const [selectTagIndex, setSelectTagIndex] = useState<number>(globalState.selectTagIndex);

  const createIconMenuNode = (type: string): React.ReactNode => (
    <React.Fragment>
      <i className={`iconfont qietugou-${type}`} />
    </React.Fragment>
  );

  const throttle = _.throttle((index: number, id: number) => {
    setSelectTagIndex(index);
    handleSelectTagId(id, index);
  }, 200);

  const changeTagItem = (e: React.MouseEvent<HTMLDivElement>, index: number, id: number) => {
    // 阻止冒泡
    e.stopPropagation();
    throttle(index, id);
  };

  const renderChildScroll = (types: API.BookmarkTag[], selectIndex: number) => (
    <div className={styles.itemSubsWrapper}>
      <div className={styles.positioner}>
        <div className={styles.bonus} style={{ top: `${selectIndex * 40}px` }} />
      </div>
      {types.map((item, index) => (
        <div
          onClick={(e) => {
            changeTagItem(e, index, item.id || 0);
          }}
          className={`${styles.subItem} ${selectIndex === index ? styles.active : ''}`}
          key={`${item.id}${index}`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
  return (
    <React.Fragment>
      <Link to="/">
        <div className={styles.menuLogo}>
          <i className={`iconfont qietugou-logo ${styles.logo}`} />
        </div>
      </Link>
      <Menu
        theme="light"
        mode="inline"
        className={styles.menuBody}
        defaultSelectedKeys={[props.route]}
      >
        {props.routes.map((route, key) => {
          if (route.hideInMenu) {
            return '';
          }
          return (
            <Menu.Item
              key={route.path || (`${key}"+key"` as string)}
              icon={createIconMenuNode(route.icon as string)}
            >
              <Link to={route.path || ''}>{route.name}</Link>
              {props.route === '/q/bookmark' && route.path === '/q/bookmark' ? (
                <div ref={ref} className={`${styles.itemSubs}`}>
                  {renderChildScroll(globalState.tagList, selectTagIndex)}
                </div>
              ) : (
                ''
              )}
            </Menu.Item>
          );
        })}
      </Menu>
      <div className={styles.menuFooter}>
        <a className={styles.host} href="/">
          qietugou.com
        </a>

        <a className={styles.copyright} href="https://beian.miit.gov.cn/">
          <CopyrightOutlined /> 2021 粤ICP备17166475号
        </a>
        <a
          className={styles.thanks}
          href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
        >
          <img src="https://www.guaosi.com/assets/img/upyun.png" alt="" />
          <span>赞助</span>
        </a>
      </div>
    </React.Fragment>
  );
};
export default IndexMenu;
