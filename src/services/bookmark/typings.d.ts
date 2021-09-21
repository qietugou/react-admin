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
  }

  type BookmarkItem = {
    name?: string;
    pid?: number;
    icon?: string;
    children?: Bookmark[]
  }

  type BookmarkTag = {
    name?: string;
    pid?: number;
  }

  type BookmarkIndexList = Response & {
     data: {
       list?: BookmarkItem[]
       tags?: BookmarkTag[]
     }
  }
}
