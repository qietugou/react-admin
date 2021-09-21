import React from 'react';
import { getBookMarkList } from "@/services/bookmark/api";

import styles from './style.less';
import { Avatar, Card, Col, Row, Skeleton, Tooltip } from 'antd';
import {
  EyeFilled
} from '@ant-design/icons';
import { useRequest } from "umi";

const Index: React.FC = () => {

  // const { handleTagItem } = useModel('index.global');
  const { data, loading } = useRequest<API.BookmarkIndexList>(() => {
    return getBookMarkList()
  })

  if (!loading) {
    console.log(1);
    // handleTagItem(data?.tags || [])
  }

  const list = data?.list || [ { children: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ] } ]
  return (
    <React.Fragment>
      <div className={styles.container}>
        { list.map(( item, index ) => {
          return <React.Fragment key={`${item.pid}${index}`}>
            <Row align="middle">
              <Skeleton avatar active loading={ loading }  paragraph={ { rows: 0 } }>
              <div className={ styles.title }>
                <Avatar className={styles.titleIcon} src={item.icon} />
                <span className={styles.titleText}>{ item?.name }</span>
              </div>
              </Skeleton>
            </Row>
            <Row align="middle">
              { item?.children && item.children.map(( child, i ) => {
                return <React.Fragment key={`${child.id}${i}`}><Col md={ 12 } sm={ 12 } xs={ 24 } lg={ 6 }>
                  <Skeleton avatar active loading={ loading } paragraph={ { rows: 3 } }>
                    <Card className={ styles.card } hoverable={true}>
                      <Card.Meta
                        avatar={ <Avatar
                          className={ styles.icon }
                          src={ child.icon }/> }
                        title={ <div className={styles.cardTitle}> {child.name}</div>}
                        description={
                          <div className={styles.cardDesc}>
                            <Tooltip placement="topLeft"  title={child.remark || child.name}> {child.remark || child.name}</Tooltip>
                            <div className={styles.countSymbol}> <EyeFilled /> <span className={styles.countNum}>9999+</span></div>
                          </div> }
                      />
                    </Card>
                  </Skeleton>
                </Col></React.Fragment>
              }) }
            </Row>
          </React.Fragment>
        }) }
      </div>
    </React.Fragment>
  );
};

export default Index;
