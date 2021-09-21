import React from 'react';
import { Card, Divider, Tag } from 'antd';
import styles from './index.less';

export interface NoteHeaderTitleProps {
  data: []
}
const ArticlesTitle: React.FC<NoteHeaderTitleProps> = () => (
  <React.Fragment>
    <Card className={ styles.headerTitle }>
      <div className={ styles.tagBody }>
        <div className={ styles.label }>
          <span>所属标签</span>
        </div>
        <div className={ styles.tags }>
          <Tag>magenta</Tag>
          <Tag>red</Tag>
          <Tag>volcano</Tag>
          <Tag>magenta</Tag>
          <Tag>red</Tag>
          <Tag>volcano</Tag>
        </div>
      </div>
      <Divider dashed style={ { margin: '10px 0 0 0' } }/>
    </Card>
  </React.Fragment>
);

export default ArticlesTitle;
