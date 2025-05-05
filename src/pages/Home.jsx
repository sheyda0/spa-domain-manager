import React, { useState } from "react";
import DomainTable from "../components/domain/DomainTable";
import DomainDrawer from "../components/domain/DomainDrawer";
import Header from "../components/layout/Header";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Handle add button click
  const handleAddClick = () => {
    setEditData(null);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <Header
        handleAddClick={handleAddClick}
        setSortOrder={setSortOrder}
        setSearchTerm={setSearchTerm}
      />

      <DomainTable
        searchTerm={searchTerm}
        sortOrder={sortOrder}
        onEdit={(data) => {
          setEditData(data);
          setIsDrawerOpen(true);
        }}
      />

      <DomainDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        editData={editData}
      />
    </div>
  );
};

export default Home;
