import React, { useCallback, useEffect, useState } from 'react';
import { Layout, BackTop } from 'antd';
import IndexMenu from './IndexMenu';
import IndexHeader from './IndexHeader';
import styles from './index.less';
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { Route } from '@ant-design/pro-layout/es/typings';
import { RocketOutlined } from '@ant-design/icons';
import { info } from '@/services/settings/api';

const { Header, Footer, Sider, Content } = Layout;

type MenuSettingInfo = {
  settings: API.SettingsItem[];
  tags: API.TagItem[];
};

const Index: React.FC<MenuDataItem & Location & Route> = (props) => {
  const [settingInfo, setSettingInfo] = useState<MenuSettingInfo>({ settings: [], tags: [] });

  const getInfo = useCallback(async () => {
    const res = await info();
    setSettingInfo({
      settings: res.data.settings,
      tags: res.data.tags,
    });
  }, []);

  useEffect(() => {
    getInfo().then();
  }, []);

  return (
    <Layout className={`${styles.homeLayout}`}>
      <Sider theme="light" className={`${styles.homeLayoutSider}`}>
        <IndexMenu
          settings={settingInfo.settings}
          tags={settingInfo.tags}
          route={props.location.pathname}
          routes={props.route.children}
        />
      </Sider>
      <Layout className={styles.homeSiteLayout}>
        <Header className={styles.header}>
          <IndexHeader
            route={props.route.children.find(
              (r: { path: string }) =>
                r.path === props.location.pathname ||
                props.location.pathname.startsWith(r.path as string),
            )}
            login={props.location?.query?.q === 'login'}
          />
        </Header>
        <Content className={styles.content}>{props.children}</Content>
        <Footer>
          <BackTop className={styles.backTop}>
            <RocketOutlined className={styles.backup} />
          </BackTop>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
