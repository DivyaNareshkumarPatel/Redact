import React from "react";
import SideBar from "../Components/SideBar";
import DocumentTable from "../Components/DocumentTable";
import "../style/documents.css";
export default function Documents() {
  return (
    <div>
      <div className="doc">
        <div>
          <SideBar />
        </div>
        <div className="docTable">
          <DocumentTable />
        </div>
      </div>
    </div>
  );
}
