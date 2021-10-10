import React, { useRef, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import styles from './menu.less';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { useModel } from '@@/plugin-model/useModel';
import _ from 'lodash';
import Setting from './components/setting';

export type MenuProps = {
  routes: MenuDataItem[];
  route: string;
  settings: API.SettingsItem[];
  tags: API.BookmarkTag[];
};

const IndexMenu: React.FC<MenuProps> = (props) => {
  const { handleSelectTagId } = useModel('index.global', (ret) => ({
    handleSelectTagId: ret.handleSelectTagId,
  }));

  const ref = useRef<HTMLDivElement>(null);
  const [selectTagIndex, setSelectTagIndex] = useState<number>(0);

  const createIconMenuNode = (type: string): React.ReactNode => (
    <React.Fragment>{type}</React.Fragment>
  );

  const getSettingByKey = (key: string): API.SettingsItem => {
    return props.settings.find((s) => s.field_key === key) as API.SettingsItem;
  };

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

  const defaultSelectedKeys = (routes: MenuDataItem[], route: string): string[] => {
    const res = routes.find((r) => {
      return r.path === route || route.startsWith(r.path as string);
    });
    return res ? [res.path as string] : [];
  };

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
        defaultSelectedKeys={defaultSelectedKeys(props.routes, props.route)}
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
                  {renderChildScroll(props.tags, selectTagIndex)}
                </div>
              ) : (
                ''
              )}
            </Menu.Item>
          );
        })}
      </Menu>
      <div className={styles.menuFooter}>
        <Setting hasLink={true} settings={getSettingByKey('HOST')} />
        <Setting hasLink={true} settings={getSettingByKey('ICP-ADDRESS')} />
        {props.settings
          .filter((r) => r.type === 1)
          .map((item) => {
            return <Setting key={item.id} hasLink={true} type="thanks" settings={item} />;
          })}
      </div>
    </React.Fragment>
  );
};
export default React.memo(IndexMenu);
