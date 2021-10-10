import ProCard from '@ant-design/pro-card';
import Content from '../content';
import React, { useState } from 'react';
import { Card, Avatar, Typography, Tooltip } from 'antd';
import styles from './style.less';
import { getBookMarkByLevel } from '@/services/bookmark/api';
import { useRequest, history, useAccess } from 'umi';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import UpdateForm from './UpdateForm';
import { Access } from '@@/plugin-access/access';

const CardList: React.FC = () => {
  const access = useAccess();

  const { data, run, loading } = useRequest<API.BookmarkLevelList>(() => {
    return getBookMarkByLevel(2, 1);
  });

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.MenuListItem>({});

  const pushBookmarkDetail = (id: number, name: string) => {
    history.push({
      pathname: '/bookmark/detail',
      query: {
        pid: `${id}`,
        name,
      },
    });
  };

  const list = data || [{}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <React.Fragment>
      <Content>
        <ProCard className={styles.cardList} wrap gutter={[16, 16]}>
          {list.map((item, key) => {
            return (
              <ProCard
                key={`${item.id}-${key}`}
                size="small"
                hoverable
                bordered
                colSpan={6}
                loading={loading}
                className={styles.card}
                actions={[
                  <Access key="book-update" accessible={access.canButton('bookmark-update')}>
                    <Tooltip key="edit" title="编辑">
                      <EditOutlined
                        onClick={() => {
                          setCurrentRow(item);
                          handleUpdateModalVisible(true);
                        }}
                      />
                    </Tooltip>
                  </Access>,
                  <Access key="book-ellipsis" accessible={access.canButton('bookmark-select')}>
                    <Tooltip title="查看列表">
                      <EllipsisOutlined
                        onClick={() => {
                          pushBookmarkDetail(item.id || 0, item.name || '');
                        }}
                      />
                    </Tooltip>
                  </Access>,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar className={styles.cardAvatar} src={item?.icon} />}
                  title={<a>{item?.name}</a>}
                  description={
                    <Typography.Paragraph className={styles.item}>
                      {item?.remark}
                    </Typography.Paragraph>
                  }
                />
              </ProCard>
            );
          })}
        </ProCard>
        <UpdateForm
          columns={currentRow}
          updateModalVisible={updateModalVisible}
          handleUpdateModalVisible={handleUpdateModalVisible}
          onUpdateSubmit={() => {
            run().then();
          }}
        />
      </Content>
    </React.Fragment>
  );
};

export default CardList;
