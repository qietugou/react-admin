import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { PageContainerProps } from '@ant-design/pro-layout/lib/components/PageContainer';

const Content: React.FC<PageContainerProps> = (props) => {
  // const HandleBreadcrumbRender = (p: PageHeaderProps, defaultDom: React.ReactNode):  React.ReactNode => {
  //   console.log(111, p, defaultDom )
  //   return false
  // }

  return (
    <PageContainer
      header={{
        title: false,
      }}
      waterMarkProps={{ content: 'QIE-TU-GOU' }}
    >
      {props.children}
    </PageContainer>
  );
};

export default Content;
