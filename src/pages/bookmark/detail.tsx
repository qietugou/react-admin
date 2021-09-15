import React from "react";
import ProList from '@ant-design/pro-list';
import { getBookMarkByLevel } from "@/services/bookmark/api";
import { history } from "umi";
import { LeftOutlined } from '@ant-design/icons';

type BookMarkLocal = {
  location: {
    query: {
      pid: string,
      name: string
    }
  }
}
const DetailList: React.FC<BookMarkLocal> = (props) => {
  return <ProList<API.Bookmark>
    search={false}
    rowKey="id"
    headerTitle={<a onClick={() => {
      history.goBack();
    }}><LeftOutlined />  {props.location.query.name}</a>}
    request={() => {
       return getBookMarkByLevel(3, Number(props.location.query.pid))
    }}
    pagination={false}
    split={true}
    showActions="hover"
    metas={{
      title: {
        dataIndex: 'name',
      },
      avatar: {
        dataIndex: 'icon',
      },
      description: {
        dataIndex: 'remark',
      },
    }}
  />
}

export default DetailList;
