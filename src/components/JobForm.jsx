import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
        Select, 
        SelectTrigger, 
        SelectValue,
        SelectContent, 
        SelectItem 
    } from "@/components/ui/select";
import { Button } from "@/components/ui/button";


export default function JobForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        status: 'applied',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value});
    }

    const handleStatusChange = (value) => {
        setFormData({...formData, status: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form dummy submitted:", formData)
        //TODO: Connect to Dexie
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
                placeholder="Position"
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
            <Button type="submit">Add Job</Button>
        </form>
    )
}