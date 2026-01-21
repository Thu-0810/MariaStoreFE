import { Table } from "antd";

export default function OrdersTable({
  columns,
  dataSource,
  rowSelection,
  onRowClick,
}) {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      pagination={false}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
      className="custom-table cursor-pointer"
    />
  );
}