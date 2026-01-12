import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import JobRow from "./JobRow";
import SortableTableHead from "../common/SortableTableHead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { COLUMNS } from "@/lib/constants";
export default function JobTable({ visibleColumns }) {
  const jobs = useLiveQuery(() => {
    try {
      return db.jobs.toArray();
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      return [];
    }
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedJobs = useMemo(() => {
    if (!sortConfig.key) return jobs;
    return [...jobs].sort((a, b) => {
      if (sortConfig.key === "dateAdded") {
        return sortConfig.direction === "asc"
          ? a.dateAdded - b.dateAdded
          : b.dateAdded - a.dateAdded;
      } else if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      } else if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [jobs, sortConfig]);

  if (!jobs) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-fit table-center">
        <TableHeader>
          <TableRow>
            {COLUMNS.map(
              (col) =>
                //Implicitly return if visible
                visibleColumns[col.key] && (
                  <SortableTableHead
                    key={col.key}
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                    columnKey={col.key}
                  >
                    {col.label}
                  </SortableTableHead>
                )
            )}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  Object.values(visibleColumns).filter(
                    (value) => value === true
                  ).length + 1
                }
                className="text-center py-8"
              >
                No jobs found. Add a job to get started.
              </TableCell>
            </TableRow>
          ) : (
            sortedJobs.map((job) => (
              <JobRow key={job.id} job={job} visibleColumns={visibleColumns} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
