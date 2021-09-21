// import React from 'react';
// import { Card, Skeleton, Comment, Icon, Tag } from 'antd';
// import moment from 'moment';
// import ReactZmage, { IStaticControllerParams } from 'react-zmage';
// import Link from 'umi/link';
// import QTooltip from '@/components/QTooltip';
// import { NoteListState } from '@/pages/note/model';
// import styles from '../index.less';
//
// export interface NoteHeaderTitleProps {
//   loading: boolean;
//   notes: NoteListState;
// }
//
// const ZmagController: IStaticControllerParams = {
//   // 关闭按钮
//   close: false,
//   // 缩放按钮
//   zoom: false,
//   // 下载按钮
//   download: false,
//   // 旋转按钮
//   rotate: false,
// };
// const BodyContent: React.FC<NoteHeaderTitleProps> = props => {
//   const { loading, notes } = props;
//
//   const actions = [
//     <span key="comment-basic-like">
//       <QTooltip title="Like">
//         <Icon type="like" />
//       </QTooltip>
//       <span style={{ paddingLeft: 8, cursor: 'auto' }}>10</span>
//     </span>,
//     <span key=' key="comment-basic-dislike"'>
//       <QTooltip title="Dislike">
//         <Icon type="dislike" />
//       </QTooltip>
//       <span style={{ paddingLeft: 8, cursor: 'auto' }}>20</span>
//     </span>,
//   ];
//   return (
//     <React.Fragment>
//       {notes.data?.map(item => (
//         <Card key={item.id} className={styles.bodyContent}>
//           <Skeleton loading={loading} active></Skeleton>
//           <Comment
//             actions={actions}
//             author={
//               <Link to={{ pathname: `/articles/note/${item.id}` }}>
//                 <h2 className={styles.title}>{item.title}</h2>
//               </Link>
//             }
//             avatar={<ReactZmage controller={ZmagController} src={item.preview}></ReactZmage>}
//             content={
//               <div>
//                 <p>{item.title}</p>
//                 <p>
//                   <Tag className={styles.tag}>magenta</Tag>
//                   <Tag color="magenta">magenta</Tag>
//                 </p>
//               </div>
//             }
//             datetime={
//               <QTooltip title={moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}>
//                 <span>{moment(item.created_at).fromNow()}</span>
//               </QTooltip>
//             }
//           />
//         </Card>
//       ))}
//     </React.Fragment>
//   );
// };
//
// export default BodyContent;
