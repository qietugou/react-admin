import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';

export default () => {
  const defaultMessage = ' - 切图狗';
  const currentYear = new Date().getFullYear();
  return (
    <React.Fragment>
      <DefaultFooter copyright={`${currentYear} ${defaultMessage}`} links={[]} />
    </React.Fragment>
  );
};
