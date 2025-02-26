import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { Log } from "../../models/responce/Log";
import logsStore from "../../store/LogsStore";
import { useEffect } from "react";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";


export const ActionLogs = () => {

  useEffect(() => {
    logsStore.fetchLogs();
  }, []);

  const columns: TableColumnsType<Log> = [
    {
      title: "Дата/Время",
      dataIndex: "datetime",
      key: "datetime",
      render: (datetime) => dayjs(datetime).format('DD.MM.YYYY HH:mm:ss'),
    },
    {
      title: "Пользователь",
      width: 150,
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action"
    },
  ];
  
  return (
    <Table<Log>
      columns={columns}
      dataSource={logsStore.data}
      scroll={{ x: "max-content", y: 55 * 5 }}
      pagination={false}
      rowKey="datetime"
    />
  );
};

export default observer(ActionLogs);
