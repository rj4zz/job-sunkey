import { useState } from "react";
import JobFormPanel from "./jobs/JobFormPanel";
import DataControls from "./data/DataControls";
import JobTable from "./jobs/JobTable";
import ColumnVisibilityMenu from "./jobs/ColumnVisibilityMenu";
import { COLUMNS } from "@/lib/constants";
import { Card } from "./ui/card";

export default function JobDashboard() {
  /* Column Visibility */
  const [visibleColumns, setVisibleColumns] = useState(
    //Initial State Object
    COLUMNS.reduce(
      (acc, { key, defaultVisible }) => ({ ...acc, [key]: defaultVisible }),
      {}
    )
  );

  const toggleColumn = (columnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  return (
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div id="toolbar" className="flex gap-2 mb-4 justify-end">
            {/* The View Button */}
            <ColumnVisibilityMenu
              visibleColumns={visibleColumns}
              toggleColumn={toggleColumn}
            />
            {/* The Add New Button */}
            <JobFormPanel />
            {/* The Import/Export Button */}
            <DataControls />
          </div>
          <JobTable visibleColumns={visibleColumns} />
        </div>
      </Card>
  );
}
