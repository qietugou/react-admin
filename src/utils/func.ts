/**
 * 树结构
 * @param treeInfo
 * @param keys
 * @param treeList
 */
export const renderTree = (treeInfo: any[], keys: number[], treeList: any[]) => {
  // 获取到所有可展开的父节点
  treeInfo.forEach((item) => {
    const tree = {
      title: item.name,
      id: item.id,
      Pid: item.pid,
      value: item.id,
      children: [],
    };
    if (item.children) {
      if (item.id != null) {
        keys.push(item.id);
      }
      renderTree(item.children, keys, tree.children);
    }
    treeList.push(tree);
  });
  return keys;
};

export type Tree = {
  title: string;
  key: string;
  children?: Tree[];
};

/**
 * @param treeInfo  权限节点
 * @param pidKey 上级节点key
 * @param treeList 渲染后的tree
 * @param treeKeys  渲染后的tree下所有keys
 * @param permissionIds 渲染后的权限id
 */
export const renderPermissionTree = (
  treeInfo: API.MenuListItem[],
  pidKey: string,
  treeList: Tree[],
  treeKeys: string[],
  permissionIds: Record<string, number>[],
) => {
  treeInfo.forEach((item) => {
    const tree: Tree = {
      title: item.name || '',
      key: `${item.pid}-${item.id}`,
      children: [],
    };
    if (item.children) {
      renderPermissionTree(
        item.children,
        `${item.pid}-${item.id}`,
        tree.children || [],
        treeKeys,
        permissionIds,
      );
    }
    if (item.permissions) {
      item.permissions.forEach((permission) => {
        const child: Tree = {
          title: permission.name || '',
          key: `${item.pid}-${item.id}-rw${permission.is_rw}-${permission.router}-${permission.method}`,
        };
        treeKeys.push(child.key);
        tree.children?.push(child);
        const p: Record<string, number> = {};
        if (permission.id != null) {
          p[child.key] = permission.id;
        }
        permissionIds.push(p);
      });
    }
    treeKeys.push(tree.key);
    treeList.push(tree);
  });
};
