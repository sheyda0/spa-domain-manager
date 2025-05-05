import { PlusOutlined } from "@ant-design/icons";

import LargeInput from "../common/LargeInput";
import LargeButton from "../common/LargeButton";
import LargeSelectOption from "../common/LargeSelectOption";

const SORT_OPTIONS = [
  { value: "asc", label: "Order by Ascending" },
  { value: "desc", label: "Order by Descending" },
];

const Header = ({ handleAddClick, setSortOrder, setSearchTerm }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between flex-wrap gap-3 items-center">
        <h1 className="text-2xl">Domains</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
        {/* Add domain button */}
        <LargeButton
          width="10.5rem"
          icon={<PlusOutlined />}
          onClick={handleAddClick}
        >
          Add Domain
        </LargeButton>

        <div className="flex flex-col md:flex-row gap-4 md:gap-7">
          {/* Sort domains */}
          <LargeSelectOption
            className="!mt-[0.5rem]"
            options={SORT_OPTIONS}
            onChange={(value) => setSortOrder(value)}
          />

          {/* Search domain */}
          <LargeInput
            onChange={(e) => setSearchTerm(e.target.value)}
            isSearch={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
