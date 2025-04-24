import { Button } from "@/components/ui/button";
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
import { createCategory } from "@/lib/action";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl font-semibold">Create Category</h1>
        <form action={createCategory} className="space-y-4 w-full max-w-md">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              required
              id="name"
              type="text"
              name="name"
              placeholder="Enter category name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Category Slug</Label>
            <Input
              id="slug"
              type="text"
              name="slug"
              placeholder="Enter category slug"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Category Description</Label>
            <Input
              required
              id="description"
              type="text"
              name="description"
              placeholder="Enter description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Category Thumbnail</Label>
            <Input
              type="file"
              name="thumbnail"
              id="image"
              placeholder="Upload image"
            />
          </div>

          <div className="space-y-2">
            <Label>Category IsActive</Label>
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

          <Button type="submit" className="w-full cursor-pointer">Create Category</Button>
        </form>
      </div>
    </>
  );
}
