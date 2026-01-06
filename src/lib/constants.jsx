import { Badge } from "@/components/ui/badge";
function getStatusVariant(status) {
  switch (status) {
    case "rejected":
      return "destructive";
    case "offer":
      return "success";
    case "interviewing":
      return "info";
    default:
      return "default";
  }
}

//RULE: Ensure if that render is always a function if present
export const COLUMNS = [
  { key: "company", label: "Company", sortable: true, defaultVisible: true },
  { key: "position", label: "Position", sortable: true, defaultVisible: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    defaultVisible: true,
    render: (status) => (
      <Badge variant={getStatusVariant(status)}>{status}</Badge>
    ),
  },
  {
    key: "dateAdded",
    label: "Date Added",
    sortable: true,
    defaultVisible: true,
    render: (date) => new Date(date).toLocaleDateString("en-GB"),
  },
  { key: "salary", label: "Salary", sortable: false, defaultVisible: false },
];
