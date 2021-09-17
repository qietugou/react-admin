import React, { useRef, useState } from "react";
import ProList from '@ant-design/pro-list';
import { getBookMarkByLevel } from "@/services/bookmark/api";
import { history } from "umi";
import { LeftOutlined } from '@ant-design/icons';
import UpdateForm from "./UpdateForm";
import type { ActionType } from "@ant-design/pro-table";

type BookMarkLocal = {
  location: {
    query: {
      pid: string,
      name: string
    }
  }
}

const DetailList: React.FC<BookMarkLocal> = (props) => {

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.MenuListItem>({});
  const actionRef = useRef<ActionType>();
  return <><ProList<API.Bookmark>
    search={false}
    actionRef={actionRef}
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
        editable: false,
      },
      avatar: {
        dataIndex: 'icon',
        editable: false,
      },
      description: {
        dataIndex: 'remark',
      },
      actions: {
        render: (text, row) => [
          <a
            onClick={() => {
              setCurrentRow(row)
              handleUpdateModalVisible(true)
            }}
            key="link"
          >
            编辑
          </a>,
        ],
      },
    }}
  />
  <UpdateForm
    columns={currentRow}
    updateModalVisible={updateModalVisible}
    handleUpdateModalVisible={handleUpdateModalVisible}
    onUpdateSubmit={() => {
      actionRef.current?.reload()
    }}
  /></>
}

export default DetailList;
