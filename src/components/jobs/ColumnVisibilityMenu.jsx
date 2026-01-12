import { COLUMNS } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Columns4 } from "lucide-react";

export default function ColumnVisibilityMenu({
  visibleColumns, //The state object consisting columnKey:visibilityBoolean
  toggleColumn, //Handler for toggling visibleColumns
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input"
        >
          <Columns4 /> View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {COLUMNS.map((col) => (
          <DropdownMenuCheckboxItem
            key={col.key}
            checked={visibleColumns[col.key]}
            onCheckedChange={() => toggleColumn(col.key)}
          >
            {col.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
