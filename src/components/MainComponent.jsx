import React from "react";
import { useState } from "react";
import { UserSelects, TableComponent } from "../components";

const MainComponent = () => {
  const [data, setData] = useState([]);

  return (
    <div className="main">
      <div className="mainWrapper">
        <h1>Random (fake) User generator system</h1>
        <UserSelects />
        <TableComponent />
      </div>
    </div>
  );
};

export default MainComponent;
