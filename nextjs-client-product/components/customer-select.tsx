"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CustomerDTO } from "@/lib/DTO/customer"

interface CustomerSelectProps {
  customerList?: CustomerDTO[]
  onCustomerSelect: (id: string) => void
  selectedCustomer?: CustomerDTO
}
export const CustomerSelect: React.FC<CustomerSelectProps> = ({ customerList, selectedCustomer, onCustomerSelect }) => {
  // if the customer list is blank render null
  if (!customerList?.length) return null
  // if there is no selected customer automatically route to the first customer in the list
  if (!selectedCustomer) onCustomerSelect(customerList[0].id)
  return (
    <Select onValueChange={(value) => onCustomerSelect(value)}>
      <SelectTrigger className="w-full">
        <SelectValue> {selectedCustomer?.name} </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {
          customerList.map((customer) => (<SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>))
        }
      </SelectContent>
    </Select>

  )
}