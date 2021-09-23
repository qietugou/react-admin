import React from 'react';
import { Row, Col, Card } from 'antd';
import styles from './index.less';

import ArticlesTitle from './components/ArticlesTitle';

const Index: React.FC = () => {
  return (
    <div className={styles.container}>
      <ArticlesTitle data={[]} />
      <Row gutter={16}>
        <Col md={24} sm={24} xs={24} lg={24}>
          <Card bordered={false} loading={true} />
        </Col>
      </Row>
    </div>
  );
};
export default Index;
