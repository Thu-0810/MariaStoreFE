import { Table } from "antd";

export default function ProductsTable({
  products,
  columns,
  loading,
  rowSelection,
  onRowClick,
}) {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={products}
      loading={loading}
      pagination={false}
      rowSelection={rowSelection}
      className="custom-table"
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
}