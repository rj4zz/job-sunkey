import { TableHead } from "../ui/table";
import {
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  ArrowUpDown,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default function SortableTableHead({
  children,
  sortConfig,
  requestSort,
  columnKey,
}) {
  const isSorted = sortConfig.key === columnKey;

  return (
    <TableHead className="p-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-full justify-center gap-1 font-semibold hover:bg-gray-100 px-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {children}
            {isSorted ? (
              sortConfig.direction === "asc" ? (
                <ArrowUpNarrowWide className="h-4 w-4 text-primary" />
              ) : (
                <ArrowDownWideNarrow className="h-4 w-4 text-primary" />
              )
            ) : (
              <ArrowUpDown className="h-4 w-4 opacity-50" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={() => requestSort(columnKey, "asc")}>
            <ArrowUpNarrowWide className="mr-2 h-4 w-4" />
            Sort Ascending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => requestSort(columnKey, "desc")}>
            <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
            Sort Descending
          </DropdownMenuItem>
          {isSorted && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => requestSort(columnKey, null)}
                className="text-destructive focus:text-destructive"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Sort
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
}
