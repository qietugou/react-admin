import { Modal, Form, Input, Button, Checkbox, Divider, message } from 'antd';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import Captcha from 'captcha';
import {
  UserOutlined,
  LockOutlined,
  WechatOutlined,
  AppleOutlined,
  QqOutlined,
  GithubOutlined,
  WeiboOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import styles from './header.less';
import { login } from '@/services/my/api';
import { setToken, hasToken } from '@/utils/token';
import { history, useModel } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

export type IndexHeaderProps = {
  login: boolean;
  route: MenuDataItem;
};
const IndexHeader: React.FC<IndexHeaderProps> = (props) => {
  const { APP_ID_CAPTCHA } = useModel('global');
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();

  const isLogin = hasToken();
  useEffect(() => {
    if (props.login) {
      setVisible(true);
    }
  }, [props.login]);

  const handlerUserLogin = () => {
    if (isLogin) {
      history.replace('/admin');
      return;
    }
    setVisible(true);
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };
  const onFinish = (values: API.LoginUserItem) => {
    setSubmitting(true);
    try {
      const loginCallback = async (loginResponse: any) => {
        if (loginResponse.success) {
          setToken(loginResponse.data);
          await fetchUserInfo();
          /** 此方法会跳转到 redirect 参数所在的位置 */
          if (!history) return;
          const { query } = history.location;
          const { redirect } = query as {
            redirect: string;
          };
          history.replace(redirect || '/admin');
        }
      };

      const captcha = new Captcha(APP_ID_CAPTCHA, async (res: API.Captcha) => {
        if (res.ret === 0) {
          // 待优化
          try {
            const loginResponse = await login({
              ...values,
              ticket: res.ticket,
              randstr: res.randstr,
            });
            await loginCallback(loginResponse);
            // eslint-disable-next-line no-empty
          } catch (err) {}
        } else {
          message.error('验证码校验失败，请重试！');
        }
        setSubmitting(false);
      });
      captcha.show();
    } catch (error) {
      setSubmitting(false);
      message.error('登录失败，请重试！');
    }
  };

  return (
    <React.Fragment>
      <div className={styles.headerFix}>
        <div className={styles.leftMenuTitle}>
          <span className={styles.icon}>{props.route?.icon}</span>
          <div className={`${styles.title}`}>{props.route?.name}</div>
        </div>
        <UserOutlined
          onClick={handlerUserLogin}
          className={isLogin ? styles.userLoginIcon : styles.userIcon}
        />
      </div>
      <Modal
        title={false}
        centered
        maskStyle={{ background: 'hsla(0,0%,100%,.4)' }}
        visible={visible}
        footer={null}
        width={330}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <h3 className={styles.headerLoginTitle}>登录</h3>
        <Form
          form={form}
          onFinish={onFinish}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            initialValue="qietugou"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue="a123654"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item className={styles.remember}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className={styles.rememberCheck}>记住我</Checkbox>
            </Form.Item>
            <a className={styles.rememberForgot} href="">
              忘记密码
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={submitting}
              className={styles.loginButton}
              htmlType="submit"
            >
              登录
            </Button>
          </Form.Item>
          <Divider plain className={styles.divider}>
            其它登录
          </Divider>
          <div className={styles.otherLoginType}>
            <WechatOutlined />
            <AppleOutlined />
            <QqOutlined />
            <GithubOutlined />
            <WeiboOutlined />
            <GoogleOutlined />
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};
export default IndexHeader;
