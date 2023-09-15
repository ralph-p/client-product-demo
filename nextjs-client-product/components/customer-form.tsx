"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CustomerDTO } from '@/lib/DTO/customer';
import { useForm } from "react-hook-form"
import { Textarea } from "./ui/textarea"
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  description: z.string().min(0),
})

type CustomerFormProps = { customer: CustomerDTO }
export const CustomerForm: React.FC<CustomerFormProps> = ({ customer }) => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: customer || {
      name: "",
      description: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios.patch(`/api/customer/${customer.id}`, values).then(() => {
      toast({
        title: `Customer Data updated`,
      })
    })
  }
  return (<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Customer Name</FormLabel>
            <FormControl>
              <Input placeholder="Bob Smith" {...field} />
            </FormControl>
            <FormDescription>
              This is the customers name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Customer Details</FormLabel>
            <FormControl>
              <Textarea placeholder="Bob Smith" {...field} />
            </FormControl>
            <FormDescription>
              Add any extra details about the customer here, preferred products, shipping methods, etc.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Update Customer</Button>
    </form>
  </Form>)
}