import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategory, updateCategory } from "@/lib/action";
import { FC } from "react";

interface PageProps {
  params: {
    name: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const { name } = await params;
  const categoryObject  = await getCategory(name);
  const category = categoryObject?.category;
  const categoryName = decodeURI(name);
  return (
    <>
      <div className="text-2xl font-semibold text-center flex gap-5 justify-center items-center flex-col">
        {" "}
        <h2 className="capitalize">{`Manage '${categoryName}' Category`}</h2>
        <form
          action={updateCategory}
          className="space-y-4 w-full max-w-md"
        >
          <input type="hidden" name="originalName" value={category?.name} />
          <div className="space-y-2">
            <Label htmlFor="name">Category Name :</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter category name"
              defaultValue={category?.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Category Slug :</Label>
            <Input
              id="slug"
              type="text"
              name="slug"
              placeholder="Enter category slug"
              defaultValue={category?.slug}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Category Description :</Label>
            <Input
              id="description"
              type="text"
              name="description"
              placeholder="Enter description"
              defaultValue={category?.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Category Thumbnail :</Label>
            <Input
              type="file"
              name="thumbnail"
              id="image"
              placeholder="Upload image"
              defaultValue={category?.thumbnail}
            />
          </div>

          <div className="flex items-center justify-baseline space-x-2">
            <Label htmlFor="isActive" className="w-full">
              Category isActive :
            </Label>
            <Input
              type="checkbox"
              name="isActive"
              id="isActive"
              placeholder="Enter isActive"
              defaultChecked={category?.isActive}
            />
          </div>

          <Button type="submit">Edit Category</Button>
        </form>
      </div>
    </>
  );
};

export default Page;
