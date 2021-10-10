import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import ArticleTitle from './components/ArticleTitle';
import ArticleContent from './components/ArticleContent';
import { KeepAlive } from 'umi';

const Index: React.FC = () => {
  return (
    <Col lg={24} className={styles.container}>
      <ArticleTitle data={[]} />
      <Row gutter={16}>
        <Col md={24} sm={24} xs={24} lg={24}>
          <ArticleContent />
        </Col>
      </Row>
    </Col>
  );
};

export default () => (
  <KeepAlive name="/article" saveScrollPosition="screen">
    <Index />
  </KeepAlive>
);
