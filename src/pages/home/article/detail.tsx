import React, { useState } from 'react';
import { Col, Row, Card } from 'antd';
import ArticleDetail from './components/ArticleDetail';
import ArticleTopic from './components/ArticleTopic';
import da from '../../../1.json';

export type Topic = {
  text: string;
  level: number;
};

const data: any = da;

const Detail: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  return (
    <Col lg={24}>
      <Row gutter={16}>
        <Col md={18} sm={18} xs={18} lg={18}>
          <Card bordered={false} loading={false}>
            <ArticleDetail
              title={'我是标题'}
              markdown={data?.combine_markdown}
              setTopics={setTopics}
            />
          </Card>
        </Col>
        <Col md={0} sm={0} xs={6} lg={6}>
          <ArticleTopic topics={topics} />
        </Col>
      </Row>
    </Col>
  );
};
export default Detail;
