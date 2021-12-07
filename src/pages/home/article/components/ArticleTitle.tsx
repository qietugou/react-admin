import React, { useState } from 'react';
import { Card, Divider, Tag } from 'antd';
import styles from './index.less';

const { CheckableTag } = Tag;

export interface NoteHeaderTitleProps {
  data: API.TagItem[];
}

const ArticleTitle: React.FC<NoteHeaderTitleProps> = (props) => {
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
            {props.data.map((tag) => (
              <CheckableTag
                key={tag.id}
                onChange={(checked) => handleChange(`${tag.id}`, checked)}
                className={styles.tag}
                checked={selectTags.indexOf(String(tag.id)) > -1}
              >
                {tag.name}
              </CheckableTag>
            ))}
          </div>
        </div>
        <Divider dashed style={{ margin: '10px 0 0 0' }} />
      </Card>
    </React.Fragment>
  );
};
export default ArticleTitle;
