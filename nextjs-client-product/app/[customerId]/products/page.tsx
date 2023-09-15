"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { productListFetcher } from '@/lib/fetcher/product-fetcher'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/product-table/data-table'
import { columns } from '@/components/product-table/columns'


const ProductsPage = () => {
  const params = useParams()
  const { data: productList, error, isLoading } = useSWR(`/api/product/${params.customerId}`, productListFetcher)
  if (isLoading) return <div>Loading</div>
  if (!productList || error) return <div>Could not find product List</div>
  console.log(productList);

  return (
    <div className='flex flex-col p-10'>
      <div className='flex justify-between'>

        <Heading title={`Products (${productList.length})`} />
        <Button>Add Product</Button>
      </div>
      <DataTable data={productList} columns={columns} />
    </div>
  )
}

export default ProductsPage