import React, { useState } from 'react';
import { Row, Col, Card, Tooltip, Badge } from 'antd';
import styles from './index.less';
import { RightOutlined, StarOutlined, ForkOutlined } from '@ant-design/icons';
import { getSubGitHubUser, getGitHubUserStarList } from '@/services/star/api';
import { useRequest } from '@@/plugin-request/request';
import moment from 'moment';

const Index: React.FC = () => {
  const [selectUser, setSelectUser] = useState<string>('qietugou');
  const { data, loading } = useRequest<API.GitHubUserList>(() => {
    return getSubGitHubUser();
  });

  const {
    data: starData,
    run: starRun,
    loading: starLoading,
  } = useRequest<API.GitHubSubUserStarList>(
    (param) => {
      return getGitHubUserStarList(param);
    },
    { defaultParams: [selectUser] },
  );

  const changeUser = (name: string) => {
    setSelectUser(name);
    starRun(name).then();
  };

  const list = data || [];
  const starList = starData || Array(8).fill({} as API.StarItem, 0, 8);
  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col>
          <Card className={styles.subSidebar} loading={loading}>
            <div className={styles.subSidebarTitle}>关注</div>
            <div className={styles.subSidebarList}>
              {list.map((item) => {
                return (
                  <Tooltip placement="topLeft" title={item.alias}>
                    <div
                      key={item.id}
                      onClick={() => {
                        changeUser(item.name as string);
                      }}
                      className={`${styles.subSidebarItem} ${
                        selectUser === item.name ? styles.active : ''
                      }`}
                    >
                      <span>{item.name}</span>
                      <RightOutlined className={styles.action} />
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          </Card>
        </Col>
        <Col lg={16}>
          {starList.map((item, index) => {
            return (
              <Card
                key={`${item.id}_${index}`}
                loading={starLoading}
                className={styles.sub}
                bordered={false}
              >
                <a href={item?.html_url} target="_blank">
                  <div className={styles.subContent}>
                    <div className={styles.icon}>
                      <img src={item?.owner?.avatar_url} alt={item?.name} />
                    </div>
                    <div className={styles.title}>
                      <div className={styles.name}> {item?.full_name}</div>
                      <div className={styles.desc}>{item?.description}</div>
                      <div className={styles.extend}>
                        <span className={styles.extendTag}>
                          <Badge color="#87d068" /> {item?.language}
                        </span>
                        <span className={styles.extendTag}>
                          <StarOutlined /> {item?.stargazers_count}
                        </span>
                        <span className={styles.extendTag}>
                          <ForkOutlined /> {item?.forks_count}
                        </span>
                        <span>
                          Updated {item?.updated_at ? moment(item?.updated_at).format('LL') : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Card>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};
export default Index;
