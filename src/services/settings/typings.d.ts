declare namespace API {
  type SettingsItem = ResponseDate & {
    id?: number;
    field_title?: string;
    field_desc?: string;
    field_key?: string;
    input_type?: string;
    field_value?: string;
    sort?: number;
    type?: number;
  };

  type SettingsItemList = Response & {
    data?: SettingsItem[];
  };

  type SettingsInfo = {
    data: {
      settings: SettingsItem[];
      tags: API.TagItem[];
    };
  };
}
