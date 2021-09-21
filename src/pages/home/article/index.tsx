import React  from 'react';
import { Row, Col, Card, Skeleton } from 'antd';
import styles from './index.less';

import ArticlesTitle from './components/ArticlesTitle';


const Index: React.FC = () => {
    return (
      <div className={styles.container}>
        <ArticlesTitle data={ [] }/>
        <Row gutter={16}>
          <Col md={24} sm={24} xs={18} lg={18}>
            <Card bordered={false} loading={true} />
          </Col>
          <Col md={0} sm={0} xs={6} lg={6}>
            <Skeleton loading={true} active />
          </Col>
        </Row>
      </div>
    );
}
export default Index
