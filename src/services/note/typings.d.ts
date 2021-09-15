declare namespace API {
  type TagItem = ResponseDate & {
    name?: string;
    id?: number;
    slug?: string;
    sort?: number;
  };

  type TagItemList = Response & {
    data?: TagItem;
  };
}
