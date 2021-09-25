import React, { useRef, useEffect, useState } from 'react';
import { Card, Divider } from 'antd';
import Prism from 'prismjs';
import marked from 'marked';
import styles from './../detail.less';
import { useRequest } from '@@/plugin-request/request';

export function rendererLink(href: string, title: string, text: string) {
  let url = href;
  let target: boolean | string = false;

  if (url.slice(0, 1) !== '#') {
    const urlParams = new URL(href, window.location.origin);

    url = urlParams.href;

    target = urlParams.host !== window.location.host ? '_blank' : false;
  }

  if (!url) {
    return text;
  }

  let out = `<a href="${url}"`;
  if (title) {
    out += ` title="${title}"`;
  }
  if (target !== false) {
    out += ` target="${target}"`;
  }
  out += `>${text}</a>`;

  return out;
}

const getDefaultMarkedOptions = () => {
  const renderer = new marked.Renderer();
  renderer.link = rendererLink;

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

const outputMarkDown = (content: string): { __html: string; topicLevel: any } => {
  const { renderer, ...otherOptions } = getDefaultMarkedOptions();
  const topicLevel: any = [];
  renderer.heading = (text: string, level: number) => {
    topicLevel.push({
      text,
      level,
    });
    return `<a id="${text}" href="${text}"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({ renderer, ...otherOptions });
  const preContent = marked(content).replace(
    /<pre>(\s*)<code class="([\w-]+)">/g,
    '<pre class="$2 line-numbers">$1<code class="$2">',
  );

  return { __html: preContent, topicLevel };
};

const ArticlesDetail: React.FC = () => {
  const codeNode = useRef<HTMLElement>(null);
  const [content, setContent] = useState<{ __html: string }>({ __html: '' });

  const { data } = useRequest<any>('https://www.einsition.com/api/articles/32');
  console.log(data);
  const bodyContent: any = {};
  useEffect(() => {
    const markdownBody: string | undefined = bodyContent?.content?.combine_markdown;
    if (codeNode.current && markdownBody) {
      const { __html, topicLevel } = outputMarkDown(markdownBody);
      console.log(topicLevel);
      setContent({ __html });
      // Use setTimeout to push onto callback queue so it runs after the DOM is updated
      Prism.highlightAllUnder(codeNode.current, false);
    }
  }, []);

  return (
    <React.Fragment>
      <Card bordered={false} className={styles.articlesTitle}>
        <h2>{bodyContent?.title}</h2>
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
export default ArticlesDetail;
