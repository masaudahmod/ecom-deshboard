import { getProducts } from "@/lib/action";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  description: string;
}

const page: FC = async () => {
  const allProducts = await getProducts();
  // console.log(allProducts?.products);
  return (
    <>
      <div className="p-3  border rounded-lg ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allProducts?.products?.map((product: Product, index: number) => (
              <TableRow key={`${product._id}-${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="capitalize">{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="flex gap-2">
                  <Button className="cursor-pointer hover:bg-slate-700 hover:text-white">
                    Edit
                  </Button>
                  <Button className="cursor-pointer hover:bg-slate-700 hover:text-white">
                    Delete
                  </Button>
                  <Link href={`/dashboard/manage-product/${product._id}`} className=" px-5 transition-all duration-300 py-2 bg-slate-200 text-black rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white">
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default page;
