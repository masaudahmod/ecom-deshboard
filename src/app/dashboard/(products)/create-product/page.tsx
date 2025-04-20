import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, getAllCategories, getSubCategories } from "@/lib/action";
import { FC } from "react";

interface Category {
  _id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

interface SubCategory {
  _id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

const page: FC = async () => {
  const getCategories = await getAllCategories();
  const categories = getCategories?.categories;

  const getAllSubCategories = await getSubCategories();
  const subCategories = getAllSubCategories?.subcategories;
  
  return (
    <>
      <section className="w-full max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-yellow-400">
          Add Product
        </h2>
        <form action={createProduct}>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="flex flex-col gap-2">
              <Label>Product Title</Label>
              <Input name="title" placeholder="Product Title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Slug</Label>
              <Input name="slug" placeholder="Slug" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product Description</Label>
              <Input name="description" placeholder="Product Description" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product Category</Label>
              <Select name="category">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories?.map((category: Category) => (
                      <SelectItem
                        key={category._id}
                        value={category._id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product sub category</Label>
              <Select name="subCategory">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subCategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub Categories</SelectLabel>
                    {subCategories?.map((subCategory: SubCategory) => (
                      <SelectItem
                        key={subCategory._id}
                        value={subCategory._id.toString()}
                      >
                        {subCategory.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <Input name="subCategory" placeholder="Product subCategory" value={'678a4d43d53b4f78a3c6f9d5'}></Input> */}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product Brand</Label>
              <Input name="brand" placeholder="Product Brand" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product Thumnail</Label>
              <Input
                type="file"
                name="thumbnail"
                placeholder="Product Thumbnail"
              />
            </div>
            <div className="flex flex-col col-span gap-2">
              <Label>Is Active</Label>
              <Select name="isActive">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">true</SelectItem>
                    <SelectItem value="false">false</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <Label>Product Images</Label>
              <Input name="images" type="file" multiple placeholder="Product Description" />
            </div>
            {/* <ImageUpload label="Product Images" className="md:col-span-2" /> */}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 w-full cursor-pointer hover:text-white transition-all duration-300 text-black font-semibold px-4 py-2 mt-4 max-w-80 rounded-lg "
            >
              Add Product
            </button>
          </div>
        </form>
      </section>{" "}
    </>
  );
};

export default page;
