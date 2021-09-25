import React from 'react';
import { Col, Row, Card } from 'antd';
import styles from '@/pages/home/article/index.less';
import ArticlesDetail from './components/ArticlesDetail';

const Detail: React.FC = () => {
  return (
    <Col lg={24} className={styles.container}>
      <Row gutter={16}>
        <Col md={24} sm={24} xs={18} lg={18}>
          <Card bordered={false} loading={false}>
            <ArticlesDetail />
          </Card>
        </Col>
        <Col md={0} sm={0} xs={6} lg={6} />
      </Row>
    </Col>
  );
};
export default Detail;
