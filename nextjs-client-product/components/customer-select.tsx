"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CustomerSelectProps {
  customerName: string
}
export const CustomerSelect: React.FC<CustomerSelectProps> = ({ customerName }) => {
  return (
    <Select onValueChange={(value) => console.log(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Customer" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>

  )
}