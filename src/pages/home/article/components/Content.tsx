// import React, { useRef, useEffect, useState } from 'react';
// import { Card, Icon, Divider } from 'antd';
// // @ts-ignore
// import Prism from 'prismjs';
// // @ts-ignore
// import marked from 'marked';
// import { NoteState, NoteTopicLevel } from '@/pages/note/model';
// import styles from '../articles.less';
// import QTooltip from '@/components/QTooltip';
// // @ts-ignore
// import { getDefaultMarkedOptions } from '@/utils/func';
// // @ts-ignore
//
// export interface NoteArticlesProps {
//   noteTopicLevel?: (topicLevel: NoteTopicLevel['topicLevel']) => void;
//   note: NoteState;
// }
//
// const outputMarkDown = (
//   content: string,
// ): { __html: string; topicLevel: NoteTopicLevel['topicLevel'] } => {
//   const { renderer, ...otherOptions } = getDefaultMarkedOptions();
//   const topicLevel: NoteTopicLevel['topicLevel'] = [];
//   renderer.heading = (text: string, level: number) => {
//     topicLevel.push({
//       text,
//       level,
//     });
//     return `<a id="${text}" href="${text}"><h${level}>${text}</h${level}></a>\n`;
//   };
//
//   marked.setOptions({ renderer, ...otherOptions });
//   const preContent = marked(content).replace(
//     /<pre>(\s*)<code class="([\w-]+)">/g,
//     '<pre class="$2 line-numbers">$1<code class="$2">',
//   );
//
//   return { __html: preContent, topicLevel };
// };
//
// const ArticlesContent: React.FC<NoteArticlesProps> = props => {
//   const codeNode = useRef<HTMLElement>(null);
//   const [content, setContent] = useState<{ __html: string }>({ __html: '' });
//   const { note, noteTopicLevel } = props;
//
//   useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/camelcase
//     const markdownBody: string | undefined = note.object?.content.combine_markdown;
//     if (codeNode.current && markdownBody) {
//       const { __html, topicLevel } = outputMarkDown(markdownBody);
//       setContent({ __html });
//       // Use setTimeout to push onto callback queue so it runs after the DOM is updated
//       if (noteTopicLevel) {
//         noteTopicLevel(topicLevel); // 通知父组件
//       }
//       Prism.highlightAllUnder(codeNode.current, false);
//     }
//   }, [note]);
//
//   return (
//     <React.Fragment>
//       <Card bordered={false} className={styles.articlesTitle}>
//         <h2>{note.object?.title}</h2>
//         <div className={styles.articlesTag}>
//           <span>
//             <QTooltip title="Like">
//               <Icon type="like" />
//             </QTooltip>
//             10
//           </span>
//           <span>
//             <QTooltip title="Dislike">
//               <Icon type="dislike" />
//             </QTooltip>
//             20
//           </span>
//
//           <span>发布于 3个月前</span>
//           <span> / </span>
//           <span>更新于 3个月前</span>
//         </div>
//       </Card>
//       <Divider dashed />
//       <Card bordered={false} className={styles.articlesBody}>
//         <code ref={codeNode} dangerouslySetInnerHTML={content}></code>
//       </Card>
//     </React.Fragment>
//   );
// };
// export default ArticlesContent;
