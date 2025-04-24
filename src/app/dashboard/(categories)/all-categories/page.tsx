import React from "react";

import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/lib/action";
import Link from "next/link";

interface Category {
  _id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export default async function Page() {
  const allCategories = await getAllCategories();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">All Categories</h1>
      <div className="container mx-auto py-2 px-5 mt-5 border rounded-xl">
        <div className="px-4 py-2 text-xl">
          {allCategories?.categories?.length ? (
            allCategories.categories.map(
              (category: Category, index: number) => (
                <div
                  key={`${category._id}-${index}`}
                  className="capitalize grid grid-cols-4 gap-4 p-2 border-b"
                >
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                  {/* <p>{category.description}</p> */}
                  <p>{category.isActive ? "Active" : "Inactive"}</p>
                  <Link
                    href={`/dashboard/manage-categories/${category.name}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                  <Button
                  // onClick={async() => {
                  //   await deleteCategory(category._id);
                  // }}
                  type="button"
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </Button>
                </div>
              )
            )
          ) : (
            <p className="text-center text-gray-500">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
