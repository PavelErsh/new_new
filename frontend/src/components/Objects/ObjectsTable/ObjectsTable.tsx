import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  id: number;
  code: string;
  name: string;
  customer: string;
  executor: string;
  status: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Номер",
    width: 80,
    dataIndex: "id",
  },
  {
    title: "Шифр",
    dataIndex: "code",
  },
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Заказчик",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Ответственный исполнитель",
    dataIndex: "executor",
    key: "executor",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
  },
];

const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i,
  id: i,
  code: `A00${i}`,
  name: `Объект ${i}`,
  customer: `Заказчик ${i}`,
  executor: `Иванов Иван ${i}`,
  status: `В процессе ${i}`,
}));

export const ObjectsTable = () => {
  return (
    <Table<DataType>
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: "max-content", y: 500 }}
    />
  );
};

export default ObjectsTable;
