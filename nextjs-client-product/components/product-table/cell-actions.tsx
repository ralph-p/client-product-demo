import { ProductDTO } from "@/lib/DTO/product";
import { MoreHorizontal, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
interface CellActionProps {
  data: ProductDTO
  callback?: () => Promise<unknown>
}

export const CellAction: React.FC<CellActionProps> = ({ data, callback }) => {
  const params = useParams();
  const onDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    await axios.delete(`/api/customer/${params.customerId}/product/${data.id}`).then(() => callback && callback())
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(event) => onDelete(event)}>
          <Button variant={"destructive"}>
            Delete <Trash className=" ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}