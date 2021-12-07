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

/**
 * 渲染 Marked Link a 标签
 * @param href
 * @param title
 * @param text
 */
export function renderMarkedLink(href: string, title: string, text: string) {
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

/**
 * 根据url 返回非域名 部分
 * @param url
 */
export function getUrlRelativePath(url: string) {
  const arrUrl = url.split('//');
  if (arrUrl.length <= 1) {
    return url;
  }
  const start = arrUrl[1].indexOf('/');
  const relUrl = arrUrl[1].substring(start); // stop省略，截取从start开始到结尾的所有字符

  if (relUrl.indexOf('?') !== -1) {
    return relUrl.split('?')[0];
  }
  return relUrl;
}
