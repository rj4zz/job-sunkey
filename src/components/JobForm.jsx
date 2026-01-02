import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { db } from "@/lib/db";
import { useState } from "react";
import { toast } from "sonner";


export default function JobForm() {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        status: 'applied',
        description: "",
        url: "",
        salary: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value});
    }

    const handleStatusChange = (value) => {
        setFormData({...formData, status: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const jobData = {
                //Generate UUID
                id: self.crypto.randomUUID(),
                //Add input data with current timestamp
                ...formData,
                dateAdded: Date.now(),
                lastUpdated: Date.now(),
            }
            await db.jobs.add(jobData)
            toast.success("Job Added Successfully")
        } catch (error) {
            toast.error("Could not add job. Please try again.")
            console.error("Error adding job:", error)
        } finally {
            setFormData({
                company: "",
                position: "",
                status: "applied",
                description: "",
                url: "",
                salary: "",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleInputChange}
            />
            <Input
                name="position"
                placeholder="Role/Position"
                value={formData.position}
                onChange={handleInputChange}
            />
            <Select onValueChange={handleStatusChange} value={formData.status}>
                <SelectTrigger>
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
            <Textarea 
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
            />
            <Input
                name="url"
                type="URL"
                placeholder="URL"
                value={formData.url}
                onChange={handleInputChange}
            />
            <Input
                name="salary"
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleInputChange}
            />
            <Button type="submit">Add Job</Button>
        </form>
    )
}