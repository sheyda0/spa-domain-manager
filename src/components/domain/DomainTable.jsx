import React from "react";

import { Table } from "antd";

import { useGetDomainsQuery } from "../../features/domains/domainSlice";
import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";

import StatusTag from "../common/StatusTag";
import DomainActions from "./DomainActions";

const DomainTable = ({ searchTerm, sortOrder, onEdit }) => {
  // Fetch domains
  const { data = [], isLoading } = useGetDomainsQuery();

  // Remove protocol for sort
  const removeProtocol = (url) => {
    return url.replace(/^https?:\/\//, "");
  };

  // Filter and sort domain data
  const filtered = data
    .filter((item) =>
      item.domain.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const domainA = removeProtocol(a.domain);
      const domainB = removeProtocol(b.domain);
      const compare = domainA.localeCompare(domainB);
      return sortOrder === "asc" ? compare : -compare;
    });

  // Table columns
  const columns = [
    {
      title: "Domain URL",
      dataIndex: "domain",
      key: "domain",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <div className="size-[1rem] flex items-center justify-center">
            {/* Active status icon */}
            {record.isActive ? (
              <span className="text-green-600 text-[1.5rem] mb-[0.2rem]">
                ●
              </span>
            ) : (
              <InfoCircleOutlined
                style={{ color: "red", fontSize: "0.8rem" }}
              />
            )}
          </div>
          {/* Domain link */}
          <a
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-all duration-300 !text-black"
          >
            {text} <LinkOutlined />
          </a>
        </div>
      ),
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) => (
        <StatusTag
          status={active ? "Active" : "Not Active"}
          type={active ? "success" : "error"}
        />
      ),
    },
    {
      title: "Verification status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <StatusTag
          status={
            status === "verified"
              ? "Verified"
              : status === "pending"
              ? "Pending"
              : "Not verified"
          }
          type={
            status === "verified"
              ? "success"
              : status === "pending"
              ? "warning"
              : "error"
          }
        />
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => <DomainActions domain={record} onEdit={onEdit} />,
    },
  ];

  return (
    <div className="domains-table-container">
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey={(record) => record.id}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default DomainTable;
