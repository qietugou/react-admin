/*
import React from 'react';
import { Anchor } from 'antd';
import { NoteTopicLevel, Topic } from '@/pages/note/model';

export interface NoteArticlesProps {
  topicLevel: NoteTopicLevel['topicLevel'];
}

const renderTopicLevel = (topicLevel: NoteTopicLevel['topicLevel']) => {
  const arr = [];
  for (let i = 0; i < topicLevel.length; i += 1) {
    const item: any = {
      topic: topicLevel[i] as Topic,
      children: [],
    };
    for (let j = i + 1; j < topicLevel.length; j += 1) {
      if (topicLevel[i].level > topicLevel[j].level) {
        item.children.push({
          topic: topicLevel[j] as Topic,
          children: [],
        });
        i += 1;
      }
    }
    arr.push(item);
  }
  return arr;
};

const renderToc = (items: any[]) =>
  items.map(item => {
    const { topic, children } = item;
    return (
      topic && (
        <Anchor.Link key={topic.text} href={`#${topic.text}`} title={topic.text}>
          {children && renderToc(children)}
        </Anchor.Link>
      )
    );
  });

const ArticlesAnchor: React.FC<NoteArticlesProps> = props => {
  const { topicLevel } = props;
  const topicTree = renderTopicLevel(topicLevel);
  return (
    <React.Fragment>
      <Anchor
        affix
        style={{ padding: 24 }}
        showInkInFixed
        getContainer={() =>
          document.querySelector('.ant-layout-has-sider .ant-layout') as HTMLElement
        }
      >
        {renderToc(topicTree)}
      </Anchor>
    </React.Fragment>
  );
};

export default ArticlesAnchor;
*/
