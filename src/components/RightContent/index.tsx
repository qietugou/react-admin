import { Space } from 'antd';
import React from 'react';
import { Link, useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Link
        to="/"
        innerRef={() => {
          return null;
        }}
      >
        <div>
          <i className={`iconfont qietugou-ziyuan15`} />
          首页
        </div>
      </Link>
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
