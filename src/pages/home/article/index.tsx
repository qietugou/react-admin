import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import ArticlesTitle from './components/ArticlesTitle';
import ArticlesContent from './components/ArticlesContent';

const Index: React.FC = () => {
  return (
    <Col lg={24} className={styles.container}>
      <ArticlesTitle data={[]} />
      <Row gutter={16}>
        <Col md={24} sm={24} xs={24} lg={24}>
          <ArticlesContent />
        </Col>
      </Row>
    </Col>
  );
};
export default Index;
