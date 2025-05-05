import { Select } from "antd";

const LargeSelectOption = ({
  options,
  onChange,
  width = "16rem",
  className = "",
}) => {
  return (
    <Select
      defaultValue={options?.[0]?.value}
      onChange={onChange}
      style={{ width, alignItems: "center" }}
      className={`large-select-option ${className}`}
    >
      {options?.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LargeSelectOption;
