import React from 'react';
import { Card, Skeleton, Comment, Tag, Image, Tooltip } from 'antd';
import moment from 'moment';
import { Link } from 'umi';
import { EyeFilled } from '@ant-design/icons';
import styles from './index.less';

export interface NoteBodyContentProps {
  data: API.ArticleItem[];
}

const BodyContent: React.FC<NoteBodyContentProps> = (props) => {
  const actions = [
    <span key="comment-basic-like">
      <EyeFilled /> <span className={styles.countNum}>9999+</span>
    </span>,
  ];
  return (
    <React.Fragment>
      {props.data.map((item) => {
        return (
          <Card key={item.id} className={styles.bodyContent}>
            <Skeleton loading={false} active />
            <Comment
              actions={actions}
              author={
                <Link to={{ pathname: `/q/article/slug?s=${item.id}` }}>
                  <h2 className={styles.title}>{item.title}</h2>
                </Link>
              }
              avatar={<Image src={item.preview} />}
              content={
                <div>
                  <p>{item.content}</p>
                  <p>
                    <Tag className={styles.tag}>magenta</Tag>
                    <Tag color="magenta">magenta</Tag>
                  </p>
                </div>
              }
              datetime={
                <Tooltip title={moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(item.created_at).fromNow()}</span>
                </Tooltip>
              }
            />
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default BodyContent;
