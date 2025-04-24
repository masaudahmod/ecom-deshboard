import { getProduct } from "@/lib/action";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

const page: FC<PageProps> = async ({ params }) => {
  const { id } = await params;
  const productObject = await getProduct(id);
  const product = productObject?.product;

  return (
    <>
      <div className="text-2xl font-semibold text-center flex gap-5 justify-center items-center flex-col">
        <h2 className="text-3xl capitalize">{product?.title}</h2>
        <div>
          <form action={""}>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="flex flex-col gap-2">
                <Label>Product Title</Label>
                <Input
                  name="title"
                  placeholder="Product Title"
                  defaultValue={product?.title}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Slug</Label>
                <Input
                  name="slug"
                  placeholder="Slug"
                  defaultValue={product?.slug}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Product Description</Label>
                <Input
                  name="description"
                  placeholder="Product Description"
                  defaultValue={product?.description}
                />
              </div>
              {/* <div className="flex flex-col gap-2">
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
                <Select name="subcategory">
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
              </div> */}
              <div className="flex flex-col gap-2">
                <Label>Product Brand</Label>
                <Input
                  name="brand"
                  placeholder="Product Brand"
                  defaultValue={product?.brand}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Product Thumnail</Label>
                <Input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  placeholder="Product Thumbnail"
                />
              </div>
              <div className="flex flex-col col-span gap-2">
                <Label>Is Active</Label>
                <Select
                  name="isActive"
                  defaultValue={product?.isActive ? "true" : "false"}
                >
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

              {/* <ImageUpload label="Product Images" className="md:col-span-2" /> */}
              <div className="flex flex-col gap-2 col-span-2">
                <Label>Product Images</Label>
                <Input
                  type="file"
                  name="images"
                  placeholder="Product Images"
                  multiple
                  accept="image/*"
                />
              </div>
              <div>
                <h3>Product Images</h3>
                <div className="flex gap-2">
                  {product?.images?.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative w-32 h-32 p-2 border rounded-lg"
                    >
                      <Image
                        width={150}
                        height={100}
                        src={image.url}
                        alt={`Uploaded Preview ${index + 1}`}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 h-32 ">
                <h3>product thumbnail</h3>
                <Image
                  width={150}
                  height={100}
                  src={product?.thumbnail.url}
                  alt="Product Thumbnail"
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
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
        </div>
      </div>
    </>
  );
};

export default page;
