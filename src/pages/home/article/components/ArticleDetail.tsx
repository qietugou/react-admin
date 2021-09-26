import React, { useRef, useEffect, useState } from 'react';
import { Card, Divider } from 'antd';
import Prism from 'prismjs';
import marked from 'marked';
import styles from './../detail.less';
import { renderMarkedLink } from '@/utils/func';
import type { Topic } from '@/pages/home/article/detail';

const getDefaultMarkedOptions = () => {
  const renderer = new marked.Renderer();
  renderer.link = renderMarkedLink;
  return {
    renderer,
    headerIds: false,
    gfm: true,
    breaks: true,
    highlight(code: string, lang: string) {
      if (lang) {
        const language = lang.toLowerCase();
        const grammar = Prism.languages[language];
        if (grammar) {
          return Prism.highlight(code, grammar, language);
        }
      }
      return code;
    },
  };
};

const outputMarkDown = (content: string): { __html: string; topics: Topic[] } => {
  const { renderer, ...otherOptions } = getDefaultMarkedOptions();
  const topics: Topic[] = [];
  renderer.heading = (text: string, level: number) => {
    topics.push({
      text,
      level,
    });
    return `<a id="${text}" href="#${text}"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({ renderer, ...otherOptions });
  const preContent = marked(content).replace(
    /<pre>(\s*)<code class="([\w-]+)">/g,
    '<pre class="$2 line-numbers">$1<code class="$2">',
  );
  return { __html: preContent, topics };
};

type ArticlesDetailProps = {
  title?: string;
  markdown?: string;
  setTopics: (topics: Topic[]) => void;
};

const ArticleDetail: React.FC<ArticlesDetailProps> = (props) => {
  const codeNode = useRef<HTMLElement>(null);
  const [content, setContent] = useState<{ __html: string }>({ __html: '' });

  useEffect(() => {
    if (codeNode.current && props.markdown) {
      const { __html, topics } = outputMarkDown(props.markdown);
      setContent({ __html });
      props?.setTopics(topics);
      // Use setTimeout to push onto callback queue so it runs after the DOM is updated
      setTimeout(() => {
        if (codeNode.current) {
          Prism.highlightAllUnder(codeNode.current, false);
        }
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Card bordered={false} className={styles.articlesTitle}>
        <h2>{props.title}</h2>
        <div className={styles.articlesTag}>
          <span>10</span>
          <span>20</span>

          <span>发布于 3个月前</span>
          <span> / </span>
          <span>更新于 3个月前</span>
        </div>
      </Card>
      <Divider dashed />
      <Card bordered={false} className={styles.articlesBody}>
        <code ref={codeNode} dangerouslySetInnerHTML={content} />
      </Card>
    </React.Fragment>
  );
};
export default ArticleDetail;
