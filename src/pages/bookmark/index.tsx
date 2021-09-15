import ProCard from '@ant-design/pro-card';
import Content from '../content';
import React  from 'react';
import { Card, Avatar, Typography, Tooltip } from 'antd';
import styles from './style.less';
import { getBookMarkByLevel } from "@/services/bookmark/api";
import { useRequest, history } from "umi";
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const CardList: React.FC = () => {

  const {data, loading} = useRequest<API.BookmarkLevelList>(() => {
    return getBookMarkByLevel(2, 1)
  })

  const pushBookmarkDetail = (id: number, name: string) => {
    history.push({
      pathname: '/bookmark/detail',
      query: {
        pid: `${id}`,
        name
      },
    })
  }

 const list = data || [{},{},{},{},{},{},{},{}]
  return (
    <React.Fragment>
      <Content>
        <ProCard className={styles.cardList} wrap gutter={[16, 16]} >
          {list.map((item, key) => {
            return <ProCard
              key={`${item.id}-${key}`}
              hoverable
              bordered
              colSpan={6}
              loading={loading}
              className={styles.card}
              actions={[
                <Tooltip key="edit" title="编辑"><EditOutlined  /></Tooltip>,
                <Tooltip key="ellipsis" title="查看列表"><EllipsisOutlined onClick={() => {
                  pushBookmarkDetail(item.id || 0, item.name || '')
                }} /></Tooltip>,
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    className={styles.cardAvatar}
                    src={item?.icon}
                  />
                }
                title={<a>{item?.name}</a>}
                description={
                  <Typography.Paragraph className={styles.item} >
                    {item?.remark}
                  </Typography.Paragraph>
                }
              />
            </ProCard>
          })}
        </ProCard>
      </Content>
    </React.Fragment>
  );
};

export default CardList;
