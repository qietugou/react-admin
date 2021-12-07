import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { StatisticCard } from '@ant-design/pro-card';
import { system } from '@/services/my/api';
import { useRequest } from '@@/plugin-request/request';

const { Divider } = StatisticCard;

export default (): React.ReactNode => {
  const { data } = useRequest<API.SystemInfoResponse>(() => {
    return system();
  });

  return (
    <PageContainer>
      <Card>
        <Alert
          message={'网络一线牵,珍惜这段缘。'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <StatisticCard.Group title="系统指标">
            <StatisticCard
              statistic={{
                title: '服务器系统',
                value: data?.server_os,
              }}
            />
            <Divider />
            <StatisticCard
              statistic={{
                title: 'GO VERSION',
                value: data?.go_version,
              }}
            />
            <Divider />
            <StatisticCard
              statistic={{
                title: 'GIN VERSION',
                value: data?.gin_version,
              }}
            />
            <StatisticCard
              statistic={{
                title: 'GO 时区',
                value: data?.timezone,
              }}
            />
            <Divider />
          </StatisticCard.Group>
          <Divider type="horizontal" />
          <StatisticCard.Group>
            <StatisticCard
              statistic={{
                title: '服务器时间',
                value: data?.date_time,
              }}
            />
            <Divider />
            <StatisticCard
              statistic={{
                title: '客户端 IP',
                value: data?.user_ip ?? '-',
              }}
            />
            <Divider />
            <StatisticCard
              statistic={{
                title: '用户系统',
                value: data?.user_os,
              }}
            />
            <Divider />
            <StatisticCard
              statistic={{
                title: '用户浏览器',
                value: data?.user_browser,
              }}
            />
          </StatisticCard.Group>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
