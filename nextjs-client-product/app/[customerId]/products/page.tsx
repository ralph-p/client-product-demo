"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { productListFetcher } from '@/lib/fetcher/product-fetcher'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/product-table/data-table'
import { columns } from '@/components/product-table/columns'
import { ProductModal } from '@/components/product-modal'
import { ProductDTO } from '@/lib/DTO/product'


const ProductsPage = () => {
  const params = useParams()
  const router = useRouter()
  const { data: productList, error, isLoading, mutate } = useSWR(`/api/customer/${params.customerId}/product`, productListFetcher)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null)
  if (isLoading) return <div>Loading</div>
  if (!productList || error) return <div>Could not find product List</div>
  const onEditClick = (product: ProductDTO) => {
    setSelectedProduct({ ...product })
    setProductModalOpen(true)
  }
  const addProduct = () => {
    setSelectedProduct(null)
    setProductModalOpen(true)
  }
  const closeModal = () => {
    setSelectedProduct(null)
    setProductModalOpen(false)
    mutate()
  }
  return (
    <div className='flex flex-col p-10'>
      <div className='flex justify-between'>
        <ProductModal isOpen={productModalOpen} onClose={closeModal} initialProduct={selectedProduct} customerId={`${params.customerId}`} />
        <Heading title={`Products (${productList.length})`} />
        <Button onClick={addProduct}>Add Product</Button>
      </div>
      <DataTable data={productList} columns={columns} editProduct={onEditClick} />
    </div>
  )
}

export default ProductsPage