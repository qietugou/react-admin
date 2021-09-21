import React from 'react';
import { Layout } from 'antd';
import IndexMenu from './IndexMenu';
import IndexHeader from './IndexHeader';
import styles from './index.less';
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { Route } from '@ant-design/pro-layout/es/typings';

const { Header, Footer, Sider, Content } = Layout;

const Index: React.FC<MenuDataItem & Location & Route> = (props) => {
  return (

    <Layout className={`${styles.homeLayout}`}>
      <Sider theme="light" className={`${styles.homeLayoutSider}`}>
        <IndexMenu route={props.location.pathname} routes={props.route.children} />
      </Sider>
      <Layout className={styles.homeSiteLayout}>
        <Header className={styles.header}>
          <IndexHeader
            route={props.route.children.find(
              (r: { path: string }) => r.path === props.location.pathname,
            )}
            login={props.location?.query?.q === 'login'}
          />
        </Header>
        <Content className={styles.content}>
          {props.children}
        </Content>
        <Footer>1111111111</Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
