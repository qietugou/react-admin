import React from 'react';
import styles from './setting.less';
import { CopyrightOutlined } from '@ant-design/icons';

type SettingProps = {
  settings: API.SettingsItem;
  hasLink: boolean;
  type?: 'copyright' | 'thanks' | undefined;
  className?: string | undefined;
};

const Setting: React.FC<SettingProps> = (props) => {
  if (!props.settings) {
    return <></>;
  }
  if (props.hasLink) {
    if (props.type === 'thanks') {
      return (
        <a target="_blank" className={styles.thanksType} href={props.settings.field_desc}>
          <img src={props.settings.field_value} alt="" />
          <span>{props.settings.field_title}</span>
        </a>
      );
    }
    return (
      <a
        target="_blank"
        className={`${styles.defaultType} ${props.className}`}
        href={props.settings.field_value}
      >
        {props.type === 'copyright' ? <CopyrightOutlined /> : ''}
        {props.settings.field_desc}
      </a>
    );
  }
  return <span>{props.settings.field_desc}</span>;
};

export default React.memo(Setting);
