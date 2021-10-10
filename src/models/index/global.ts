import { useCallback, useState } from 'react';

type IndexGlobalState = {
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

  const handleSelectTagId = useCallback((id: number, index: number) => {
    setGlobalState((s) => ({ ...s, selectTagId: id, selectTagIndex: index }));
  }, []);

  return {
    globalState,
    handleSelectTagId,
  };
};
