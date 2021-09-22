declare namespace API {
  type Bookmark = ResponseDate & {
    id?: number;
    name?: string;
    guid?: string;
    type?: string;
    pid?: number;
    level?: number;
    url?: string;
    icon?: string;
    remark?: string;
  };

  type BookmarkLevelList = Response & {
    data?: Bookmark[];
  };

  type BookmarkItem = {
    name?: string;
    id?: number;
    icon?: string;
    children?: Bookmark[];
  };

  type BookmarkTag = {
    name?: string;
    id?: number;
  };

  type BookmarkIndexList = Response & {
    data: {
      list?: BookmarkItem[];
      tags?: BookmarkTag[];
    };
  };
}
