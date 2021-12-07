import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import ArticleTitle from './components/ArticleTitle';
import ArticleContent from './components/ArticleContent';
import { tagList, articleList } from '@/services/note/api';
import { KeepAlive } from 'umi';

const Index: React.FC = () => {
  const [tagItems, setTagItems] = useState<API.TagItem[]>();

  const [articleItems, setArticleItems] = useState<API.ArticleItem[]>();

  const getData = async () => {
    const tagData = await tagList();
    const articleData = await articleList({ current: 1, pageSize: 10 }, {});
    setTagItems(tagData.data);
    setArticleItems(articleData.data);
  };

  useEffect(() => {
    getData().then();
  }, []);

  return (
    <Col lg={24} className={styles.container}>
      <ArticleTitle data={tagItems || []} />
      <Row gutter={16}>
        <Col md={24} sm={24} xs={24} lg={24}>
          <ArticleContent data={articleItems || []} />
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
