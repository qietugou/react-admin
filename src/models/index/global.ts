import { useState } from 'react';

type IndexGlobalState = {
  /**
   * 标签 tag
   */
  tagList: API.BookmarkTag[];
  /**
   * 选中的 tag
   */
  selectTagIndex: number;
  /**
   * 选中的 tagId
   */
  selectTagId: number | null;
};
const initGlobalState: IndexGlobalState = {
  tagList: [],
  selectTagIndex: 0,
  selectTagId: null,
};

/**
 * 公共的变量
 */
export default () => {
  /**
   * 处理书签导航问题
   */
  const [globalState, setGlobalState] = useState<IndexGlobalState>(initGlobalState);

  /**
   * 处理书签
   * @param data
   */
  const handleTagItem = (data: API.BookmarkTag[]) => {
    setGlobalState((s) => ({ ...s, tagList: data }));
  };
  const handleSelectTagId = (id: number, index: number) => {
    setGlobalState((s) => ({ ...s, selectTagId: id, selectTagIndex: index }));
  };

  return {
    globalState,
    handleTagItem,
    handleSelectTagId,
  };
};
