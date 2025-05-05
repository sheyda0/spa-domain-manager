import { Button } from "antd";

const LargeButton = ({
  children = "Submit",
  type = "primary",
  loading = false,
  onClick,
  width = "6.5rem",
  height = "2.8rem",
  ...rest
}) => {
  return (
    <Button
      type={type}
      loading={loading}
      onClick={onClick}
      style={{ width, height }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default LargeButton;
