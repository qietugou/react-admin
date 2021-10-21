declare namespace API {
  type TagItem = ResponseDate & {
    name?: string;
    id?: number;
    slug?: string;
    sort?: number;
  };

  type GithubTagItem = ResponseDate & {
    name?: string;
    id?: number;
    alias?: string;
    sort?: number;
  };

  type ArticleItem = ResponseDate & {
    title?: string;
    id?: number;
    slug?: string;
    content?: string;
    draft_content?: string;
    preview?: string;
    views_count?: number;
    sort?: number;
    is_show?: number;
    is_draft?: number;
    tags: API.TagItem[];
  };

  type ArticleStoreItem = {
    tags: number[];
    add_tags: string[];
    draft_content: string;
    name: string;
  };

  type TagItemList = Response & {
    data?: TagItem;
  };
  type ArticleItemList = Response & {
    data?: ArticleItem;
  };

  type GithubItemList = Response & {
    data?: GithubTagItem;
  };
}
