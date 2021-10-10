import React, { useEffect } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

export default () => {
  useEffect(() => {
    const progress = NProgress.start();
    return () => {
      progress.done();
    };
  }, []);
  return (
    <React.Fragment>
      <PageLoading />
    </React.Fragment>
  );
};
