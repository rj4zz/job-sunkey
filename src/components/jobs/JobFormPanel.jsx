import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import JobForm from "./JobForm";
import { Plus } from "lucide-react";

export default function JobFormPanel() {
    const [ isSheetOpen, setOpen ] = useState(false)

    const closePanelOnSubmit = () => {
        setOpen(false)
        console.log("Panel Closed.");
    }

    const dontInteractOutside = (event) => {
        event.preventDefault()
    }

    return (
        <Sheet 
            /* Handle Open/Closed State */
            open={isSheetOpen} onOpenChange={setOpen}
        >
            <SheetTrigger asChild>
                <Button variant="default"><Plus /> Add New</Button>
            </SheetTrigger>
            <SheetContent onInteractOutside={dontInteractOutside}>
                <SheetHeader>
                    <SheetTitle>Add Job Posting</SheetTitle>
                    <SheetDescription>
                        Enter the details of the job you're applying for.
                    </SheetDescription>
                </SheetHeader>
                <div className="bg-background text-foreground flex flex-col items-center justify-center p-4">
                    <JobForm onSubmit={closePanelOnSubmit}/>
                </div>
            </SheetContent>
        </Sheet>
    )
}