import { Table } from "antd";

export default function CustomersTable({
  columns,
  dataSource,
  rowSelection,
  onRowClick,
}) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      pagination={false}
      className="custom-table"
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
}