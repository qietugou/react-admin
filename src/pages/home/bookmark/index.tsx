import React, { useEffect, useState } from 'react';
import { getBookMarkList } from '@/services/bookmark/api';
import styles from './style.less';
import { Avatar, Card, Col, Row, Skeleton, Tooltip } from 'antd';
import { animateScroll as scroll } from 'react-scroll';
import { EyeFilled } from '@ant-design/icons';
import { useRequest, useModel } from 'umi';

type ElementItem = {
  id: number;
  top: number;
};

const Index: React.FC = () => {
  const { handleTagItem, globalState } = useModel('index.global');

  const [elementItem, setElementItem] = useState<ElementItem[]>([]);

  const { data, loading } = useRequest<API.BookmarkIndexList>(() => {
    return getBookMarkList();
  });

  // 滚动边距
  const marginHeight = 24;

  useEffect(() => {
    if (!loading) {
      handleTagItem(data?.tags || []);
    }
    const collection: NodeListOf<HTMLElement> = document.querySelectorAll(
      '#book-mark .book-mark-tag-title',
    );
    const eData: ElementItem[] = [];
    Array.from(collection).forEach((item) => {
      const id = item.getAttribute('data-id');
      eData.push({
        id: Number(id),
        top: item.getBoundingClientRect().top,
      });
    });
    setElementItem(eData);
  }, [loading]);

  useEffect(() => {
    const topItem = elementItem.find((item) => {
      return item.id === globalState.selectTagId;
    });
    if (topItem) {
      const top = globalState.selectTagIndex === 0 ? 0 : topItem.top - marginHeight;
      setTimeout(() => {
        scroll.scrollTo(top);
      });
    }
  }, [globalState.selectTagId, globalState.selectTagIndex]);

  const list = data?.list || [{ children: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] }];
  return (
    <React.Fragment>
      <div className={styles.container} id="book-mark">
        {list.map((item, index) => {
          return (
            <div key={`${item.id}${index}`}>
              <Row align="middle">
                <Skeleton avatar active loading={loading} paragraph={{ rows: 0 }}>
                  <div className="book-mark-tag-title" data-id={item.id}>
                    <Avatar className={styles.titleIcon} src={item.icon} />
                    <span className={styles.titleText}>{item?.name}</span>
                  </div>
                </Skeleton>
              </Row>
              <Row align="middle">
                {item?.children &&
                  item.children.map((child, i) => {
                    return (
                      <React.Fragment key={`${child.id}${i}`}>
                        <Col md={12} sm={12} xs={24} lg={6}>
                          <Skeleton avatar active loading={loading} paragraph={{ rows: 3 }}>
                            <Card className={styles.card} hoverable={true}>
                              <Card.Meta
                                avatar={<Avatar className={styles.icon} src={child.icon} />}
                                title={
                                  <a href={child.url} target="_blank">
                                    {' '}
                                    <div className={styles.cardTitle}> {child.name}</div>
                                  </a>
                                }
                                description={
                                  <div className={styles.cardDesc}>
                                    <Tooltip placement="topLeft" title={child.remark || child.name}>
                                      {' '}
                                      {child.remark || child.name}
                                    </Tooltip>
                                    <div className={styles.countSymbol}>
                                      {' '}
                                      <EyeFilled /> <span className={styles.countNum}>9999+</span>
                                    </div>
                                  </div>
                                }
                              />
                            </Card>
                          </Skeleton>
                        </Col>
                      </React.Fragment>
                    );
                  })}
              </Row>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Index;
