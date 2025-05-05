import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const LargeInput = ({
  placeholder = "Search",
  width = "16rem",
  allowClear = true,
  isSearch = false,
  onChange,
  ...rest
}) => (
  <div className="relative">
    <Input
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      className="large-input"
      style={{
        width,
        padding: isSearch ? "0 1rem 0 2.8rem" : "0 1rem",
        height: "2.937rem",
      }}
      {...rest}
    />

    {isSearch && (
      <SearchOutlined className="absolute left-[1rem] top-[31%] text-[1.2rem] !text-[#808080] z-50" />
    )}
  </div>
);

export default LargeInput;
