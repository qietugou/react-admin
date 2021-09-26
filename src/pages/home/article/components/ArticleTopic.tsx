import React from 'react';
import { Anchor } from 'antd';
import type { Topic } from '@/pages/home/article/detail';
import styles from './topic.less';

const renderTopicLevel = (topics: Topic[]) => {
  const arr = [];
  for (let i = 0; i < topics.length; i += 1) {
    const item: any = {
      topic: topics[i] as Topic,
      children: [],
    };
    for (let j = i + 1; j < topics.length; j += 1) {
      if (topics[i].level > topics[j].level) {
        item.children.push({
          topic: topics[j] as Topic,
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
  items.map((item) => {
    const { topic, children } = item;
    return (
      topic && (
        <Anchor.Link key={topic.text} href={`#${topic.text}`} title={topic.text}>
          {children && renderToc(children)}
        </Anchor.Link>
      )
    );
  });

type ArticleTopicProps = {
  topics: Topic[];
};

const ArticleTopic: React.FC<ArticleTopicProps> = (props) => {
  const topicTree = renderTopicLevel(props.topics);
  return (
    <React.Fragment>
      <Anchor className={styles.bg} affix style={{ padding: 24 }} showInkInFixed>
        {renderToc(topicTree)}
      </Anchor>
    </React.Fragment>
  );
};

export default ArticleTopic;
