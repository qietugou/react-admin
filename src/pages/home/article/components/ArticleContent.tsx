import React from 'react';
import { Card, Skeleton, Comment, Tag, Image, Tooltip } from 'antd';
import moment from 'moment';
import { Link } from 'umi';
import { EyeFilled } from '@ant-design/icons';
import styles from './index.less';

const BodyContent: React.FC = () => {
  const actions = [
    <span key="comment-basic-like">
      <EyeFilled /> <span className={styles.countNum}>9999+</span>
    </span>,
  ];
  return (
    <React.Fragment>
      <Card className={styles.bodyContent}>
        <Skeleton loading={false} active />
        <Comment
          actions={actions}
          author={
            <Link to={{ pathname: `/q/article/slug` }}>
              <h2 className={styles.title}>微信扫小程序码实现网页端登录</h2>
            </Link>
          }
          avatar={<Image src="http://qiniu.einsition.com/article/a32/wxmeyafx0afxw5dw.png" />}
          content={
            <div>
              <p>微信扫小程序码实现网页端登录</p>
              <p>
                <Tag className={styles.tag}>magenta</Tag>
                <Tag color="magenta">magenta</Tag>
              </p>
            </div>
          }
          datetime={
            <Tooltip title={moment('2019-08-09 14:14').format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment('2019-08-09 14:14').fromNow()}</span>
            </Tooltip>
          }
        />
      </Card>
      <Card className={styles.bodyContent}>
        <Skeleton loading={false} active />
        <Comment
          actions={actions}
          author={
            <Link to={{ pathname: `/articles/note/1` }}>
              <h2 className={styles.title}>微信扫小程序码实现网页端登录</h2>
            </Link>
          }
          avatar={<Image src="http://qiniu.einsition.com/article/a32/wxmeyafx0afxw5dw.png" />}
          content={
            <div>
              <p>微信扫小程序码实现网页端登录</p>
              <p>
                <Tag className={styles.tag}>magenta</Tag>
                <Tag color="magenta">magenta</Tag>
              </p>
            </div>
          }
          datetime={
            <Tooltip title={moment('2019-08-09 14:14').format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment('2019-08-09 14:14').fromNow()}</span>
            </Tooltip>
          }
        />
      </Card>
    </React.Fragment>
  );
};

export default BodyContent;
