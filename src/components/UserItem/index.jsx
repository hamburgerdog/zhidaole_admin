import { notification } from 'antd';
import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '@/hooks/useUser';
import { NOTIFICATION_DURATION } from '@/utils/common';

import styles from './index.module.less';
import LoginModal from './LoginModal';

/**
 * 用户功能
 */

export const UserItem = memo(() => {
  const navigate = useNavigate();
  const [user, { userLogin }] = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async form => {
    try {
      await form.validateFields();
      const { username, password } = form.getFieldsValue(true);
      if (username === 'admin' && password === 'admin') {
        notification.success({
          message: '登录成功',
          description: '当前使用测试账号登录',
          duration: NOTIFICATION_DURATION,
        });
        userLogin(username);
        localStorage.setItem('token', 'admin');
        setIsModalVisible(false);
        navigate('/');
      } else {
        notification.error({
          message: '登录失败',
          description: '当前环境请使用测试账号登录，请重新输入账号密码',
          duration: NOTIFICATION_DURATION,
        });
      }
    } catch (e) {
      return;
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={styles.headerUserBox} onClick={() => showModal()}>
        <img src={user.avatar} alt="avatar" />
        <span>{user.name}</span>
      </div>
      <LoginModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </>
  );
});
