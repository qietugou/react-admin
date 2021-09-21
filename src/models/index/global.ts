import { useState } from "react";

type IndexGlobalState = {
  tagList: API.BookmarkTag[],
  selectTagIndex: number
}
const initGlobalState: IndexGlobalState = {
  tagList: [],
  selectTagIndex: 0
}

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
  }

  return {
    globalState,
    handleTagItem
  };
};
