import React from "react";

import { Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import {
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from "../../features/domains/domainSlice";

const DomainActions = ({ domain }) => {
  const [deleteDomain] = useDeleteDomainMutation();
  const [updateDomain] = useUpdateDomainMutation();

  // Handle delete domain
  const handleDelete = async () => {
    try {
      await deleteDomain(domain.id).unwrap();
      message.success({
        content: `"${domain.domain}" was deleted successfully.`,
      });
    } catch (error) {
      message.error({
        content:
          error?.data?.message ||
          `Could not delete the domain. Error: ${
            error?.data || "Unknown error."
          }`,
      });
    }
  };

  // Handle verify domain
  const handleVerify = async () => {
    try {
      await updateDomain({ id: domain.id, status: "verified" }).unwrap();
      message.success({
        content: `"${domain.domain}" has been verified successfully.`,
      });
    } catch (error) {
      message.error({
        content: `Could not verify the domain. Error: ${
          error?.data || "Unknown error."
        }`,
      });
    }
  };

  // Handle install script
  const handleInstall = async () => {
    try {
      await updateDomain({ id: domain.id, isActive: true }).unwrap();
      message.success({
        content: `Script installed for "${domain.domain}" successfully.`,
      });
    } catch (error) {
      message.error({
        content:
          error?.data?.message ||
          `Could not install the script. Error: ${
            error?.data || "Unknown error."
          }`,
      });
    }
  };

  // Handle view page
  const handleViewPage = () => {
    window.open(`https://${domain.domain}`, "_blank");
  };

  // Dropdown menu items
  const menuItems = [
    {
      key: "view",
      label: "View Page",
      onClick: handleViewPage,
    },
    {
      key: "verify",
      label: "Verify",
      onClick: handleVerify,
      disabled: domain.status === "verified",
    },
    {
      key: "install",
      label: "Install Script",
      onClick: handleInstall,
      disabled: domain.status !== "verified" || domain.isActive === true,
    },
    {
      key: "delete",
      label: <span className="text-red-600">Delete</span>,
      onClick: handleDelete,
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
      dropdownRender={(menu) => (
        <div
          style={{
            width: "12.5rem",
            padding: "0.5rem 1rem",
            marginTop: "-2rem",
            marginRight: "0.2rem",
          }}
        >
          {menu}
        </div>
      )}
    >
      <MoreOutlined style={{ fontSize: 20, cursor: "pointer" }} />
    </Dropdown>
  );
};

export default DomainActions;
