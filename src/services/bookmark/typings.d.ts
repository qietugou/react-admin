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

}
