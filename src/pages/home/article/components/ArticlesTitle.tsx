import React, { useState } from 'react';
import { Card, Divider, Tag } from 'antd';
import styles from './index.less';

const { CheckableTag } = Tag;

export interface NoteHeaderTitleProps {
  data: [];
}

const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

const ArticlesTitle: React.FC<NoteHeaderTitleProps> = () => {
  const [selectTags, setSelectTags] = useState<string[]>([]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectTags, tag] : selectTags.filter((t) => t !== tag);
    setSelectTags(nextSelectedTags);
  };
  return (
    <React.Fragment>
      <Card className={styles.headerTitle}>
        <div className={styles.tagBody}>
          <span className={styles.title}>所属标签:</span>
          <div className={styles.tags}>
            {tagsData.map((tag) => (
              <CheckableTag
                key={tag}
                onChange={(checked) => handleChange(tag, checked)}
                className={styles.tag}
                checked={selectTags.indexOf(tag) > -1}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
        </div>
        <Divider dashed style={{ margin: '10px 0 0 0' }} />
      </Card>
    </React.Fragment>
  );
};
export default ArticlesTitle;
