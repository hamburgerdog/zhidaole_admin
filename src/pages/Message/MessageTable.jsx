import { Space, Table } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';

import ButtonWithConfirm from '@/components/ButtonWithConfirm';

import styles from './index.module.less';

const columns = [
  {
    title: '通知名称',
    dataIndex: 'name',
  },
  {
    title: '通知简要',
    dataIndex: 'short',
  },
  {
    title: '关联地点',
    dataIndex: 'address',
  },
  {
    title: '截止日期',
    dataIndex: 'endTime',
  },
  {
    title: '联系方式',
    dataIndex: 'connect',
  },
  {
    title: '所属消息源ID',
    dataIndex: 'originID',
  },
  {
    title: '操作',
    align: 'center',
    key: 'action',
    width: 180,
    fixed: 'right',
    render: () => (
      <Space size="middle">
        <ButtonWithConfirm
          name="暂停发布"
          type="link"
          title="请确认是否暂停该条数据的发布状态?"
          handleConfirm={() => {}}
        />
        <ButtonWithConfirm
          name="删除"
          type="link"
          title="请确认是否删除该数据？"
          handleConfirm={() => {}}
        />
      </Space>
    ),
  },
];

const MessageTable = memo(({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = useCallback(
    selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    },
    [setSelectedRowKeys],
  );

  const rowSelection = useMemo(() => {
    return { selectedRowKeys, onChange: onSelectChange };
  }, [selectedRowKeys, onSelectChange]);

  return (
    <>
      <Table
        className={styles.tablex}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 7,
          showLessItems: true,
          showQuickJumper: true,
          size: 'small',
        }}
      />
    </>
  );
});

export default MessageTable;
