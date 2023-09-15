"use client";
import { Modal } from "@/components/ui/modal";
import { ProductDTO } from "@/lib/DTO/product";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct: ProductDTO | null
  customerId: string
}
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  price: z.string().min(1, { message: "Needs to be at least 1 dollar" }),
})
type ProductModalValues = z.infer<typeof formSchema>;
export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  customerId
}) => {
  const form = useForm<ProductModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: ""
    },
  })
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    // if we have a product sent to the modal we want to set the price and name on our form from the product
    if (initialProduct) {
      form.setValue("name", initialProduct.name)
      form.setValue("price", `${initialProduct?.price}`)
    }
    // when we unmount the modal we reset the form
    return () => {
      form.setValue("name", "")
      form.setValue("price", "")
    }
  }, [form, initialProduct]);



  if (!isMounted) {
    return null;
  }

  const onSubmit = async (values: ProductModalValues) => {
    // if we have a product we patch
    if (initialProduct) {
      await axios.patch(`/api/customer/${customerId}/product/${initialProduct.id}`, values)
    }
    // else we post a new product 
    else {
      await axios.post(`/api/customer/${customerId}/product/`, values);

    }
    onClose()
  }
  return (
    <Modal
      title="Product Modal"
      description="This will be added to the end of the plans the client has."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="CPU" {...field} />
                </FormControl>
                <FormDescription>
                  Product name should be descriptive and distinct.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{initialProduct ? "Update Product" : "Create Product"}</Button>
        </form>
      </Form>
    </Modal>
  );
}