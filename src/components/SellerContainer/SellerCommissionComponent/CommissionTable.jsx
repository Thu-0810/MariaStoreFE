import { Table } from "antd";

export default function CommissionTable({
  columns,
  dataSource,
  rowSelection,
  onRowClick,
  loading,
}) {
  return (
    <Table
      loading={loading}
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