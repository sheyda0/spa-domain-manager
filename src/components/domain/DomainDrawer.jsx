import React, { useEffect } from "react";

import { Drawer, Form, message } from "antd";

import { useAddDomainMutation } from "../../features/domains/domainSlice";
import LargeInput from "../../components/common/LargeInput";
import LargeButton from "../common/LargeButton";
import LargeSelectOption from "../common/LargeSelectOption";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
];

const DomainDrawer = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [addDomain, { isLoading }] = useAddDomainMutation();

  // Set default form values when drawer opens
  useEffect(() => {
    if (open) {
      form.setFieldsValue({ status: "pending" });
    }
  }, [open, form]);

  // Handle submit form
  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      createdDate: Math.floor(Date.now() / 1000),
      isActive: false,
    };

    try {
      await addDomain(payload).unwrap();
      message.success("Domain added successfully");
      onClose();
      form.resetFields();
    } catch {
      message.error("Something went wrong");
    }
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      width={550}
      closeIcon={false}
      title={<div className="text-xl font-normal">Add Domain</div>}
      footer={
        <div className="flex gap-6 justify-end p-3">
          {/* Cancel button */}
          <LargeButton onClick={onClose} type="default">
            Cancel
          </LargeButton>

          {/* Add button */}
          <LargeButton loading={isLoading} onClick={() => form.submit()}>
            Add
          </LargeButton>
        </div>
      }
    >
      {/* Add domain form */}
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        validateTrigger="onSubmit"
        initialValues={{
          status: "pending",
        }}
      >
        {/* Domain address */}
        <Form.Item
          name="domain"
          label="Domain Address"
          rules={[
            { required: true, message: "Domain is required" },
            {
              type: "url",
              message: "Please enter a valid URL (e.g. https://example.com)",
            },
          ]}
        >
          <LargeInput
            placeholder="Ex: https://www.bridged.media"
            width="100%"
          />
        </Form.Item>

        {/* Verification Status */}
        <Form.Item name="status" label="Verification Status">
          <LargeSelectOption options={STATUS_OPTIONS} width="100%" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DomainDrawer;
