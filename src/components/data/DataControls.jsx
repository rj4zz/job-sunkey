import { Button } from "../ui/button";
import { FileDown, FileUp } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import { db } from "@/lib/db";
import { toast } from "sonner";
import { useRef } from "react";

async function readAndParseData(file) {
  const content = await file.text();
  const jsonData = JSON.parse(content);
  return jsonData;
}
export default function DataControls() {
  const fileInputRef = useRef(null);

  const handleExport = async () => {
    try {
      //Fetch the jobs and create a JSON blob
      const jobs = await db.jobs.toArray();
      const jsonData = JSON.stringify(jobs);
      const blob = new Blob([jsonData], { type: "application/json" });

      //Create URL and simulate a click on a temporary anchor
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `jobs_backup_${Date.now()}.json`;
      document.body.appendChild(a);
      toast.success("Downloading backup!");
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export data", error);
    }
  };

  const handleFileUpload = async (event) => {
    try {
      const [file] = event.target.files;
      console.log("Found:", file.name);
      const data = await readAndParseData(file);
      if (Array.isArray(data) && data.length === 0) {
        throw new Error("Array is empty!");
      } else if (!("company" in data[0] && "position" in data[0])) {
        throw new Error("Invalid Data!");
      }

      //Sync Database
      await db.jobs.bulkPut(data);
      toast.success("Import Successful!");
    } catch (error) {
      console.error("Import Error:", error);
      toast.error("Import failed! Check console.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />
      <ButtonGroup>
        <Button variant="outline" onClick={handleExport}>
          <FileDown /> Export
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <FileUp /> Import
        </Button>
      </ButtonGroup>
    </div>
  );
}
