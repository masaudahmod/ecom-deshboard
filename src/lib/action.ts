"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function loginData(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const { data } = await response.json();

    if (data.accessToken) {
      const c = await cookies();
      const role = data.user?.role;

      c.set("accessToken", data.accessToken, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      c.set("role", role, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      redirect("/dashboard");
    } else {
      throw new Error("No access token received");
    }
  } catch (error) {
    console.error("Login Error:", error);

    throw error;
  }
}

async function logout() {
  const c = await cookies();

  const access = c.get("accessToken")?.value;
  if (access) {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access.value}`,
            Authorization: access,
          },
        }
      );

      const data = await result.json();
      if (data) {
        console.log("Logout successful:", data);
        c.delete("accessToken");
      }
      return true;
    } catch (error) {
      console.error("Error deleting cookie:", error);
    }
  }
}

async function getUser() {
  const c = await cookies();

  const access = c.get("accessToken")?.value;
  if (access) {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
          // Authorization: access,
        },
      });
      const {
        data: { user },
      } = await result.json();
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
    }
  }
}

async function createCategory(formData: FormData) {
  const c = await cookies();
  const access = c.get("accessToken")?.value;
  const name = formData.get("name");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const thumbnail = formData.get("thumbnail") as File;
  const isActive = formData.get("isActive");
  if (access) {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            name,
            slug,
            description,
            isActive,
            thumbnail,
          }),
        }
      );
      const data = await result.json();
      if (data) {
        console.log("Category created successfully.");
        // redirect("/dashboard/all-categories");
      }
      return data;
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }
}

async function getAllCategories() {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await result.json();
    if (data) {
      console.log("All Categories fetched successfully.");
      return data;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

async function getCategory(name: string) {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await result.json();
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching category:", error);
  }
}

async function updateCategory(formData: FormData) {
  const c = await cookies();
  const access = c.get("accessToken")?.value;

  if (!access) {
    console.error("Access token not found.");
    return;
  }
  const originalName = formData.get("originalName") as string;
  const payload = new FormData();
  const newName = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const isActive = formData.get("isActive") === "on";
  const thumbnail = formData.get("thumbnail") as File;

  payload.append("name", newName);
  payload.append("slug", slug);
  payload.append("description", description);
  payload.append("isActive", isActive ? "true" : "false");

  if (thumbnail && thumbnail.size > 0) {
    payload.append("thumbnail", thumbnail);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${originalName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${access}`,
        },
        body: payload,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update category. Status: ${response.status}`);
    }

    const data = await response.json();
    if (data) {
      console.log("Category updated successfully.");
      return data;
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
}

async function deleteCategory(id: number) {
  const c = await cookies();
  const access = c.get("accessToken")?.value;
  if (access) {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(result);
      const data = await result.json();
      if (data) {
        console.log("Category deleted successfully.");
        // return data;
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
}

async function getSubCategories() {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subcategories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await result.json();
    if (data) {
      console.log("Sub Categories fetched successfully.");
      return data;
    }
  } catch (error) {
    console.error("Error fetching category:", error);
  }
}

async function getProducts() {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await result.json();
    if (data) {
      console.log("Products fetched successfully.");
      return data;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function getProduct(id: string) {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await result.json();
    if (data) {
      console.log("Product fetched successfully.");
      return data;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

// async function createProduct(formData: FormData) {
//   const title = formData.get("title");
//   const slug = formData.get("slug");
//   const description = formData.get("description");
//   const isActive = formData.get("isActive");
//   const category = formData.get("category");
//   const subCategory = formData.get("subCategory");
//   const brand = formData.get("brand");
//   const thumbnailFile = formData.get("thumbnail");
//   const imagesFiles = formData.getAll("images");
//   const thumbnail = thumbnailFile as File;
//   const images = imagesFiles as File[];

//   const c = await cookies();
//   const access = c.get("accessToken")?.value;
//   if (access) {
//     try {
//       const result = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/products`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: access,
//           },
//           body: JSON.stringify({
//             title,
//             slug,
//             description,
//             isActive,
//             category,
//             subCategory,
//             brand,
//           }),
//         }
//       );

//       console.log(result);
//       const { data } = await result.json();
//       if (data) {
//         console.log("Product created successfully");
//         return data;
//       }
//     } catch (error) {
//       console.error("Error creating product:", error);
//     }
//   }
// }

async function createProduct(formData: FormData) {
  const data = new FormData();

  data.append("title", formData.get("title") as string);
  data.append("slug", formData.get("slug") as string);
  data.append("description", formData.get("description") as string);
  data.append("isActive", formData.get("isActive") as string);
  data.append("category", formData.get("category") as string);
  data.append("subcategory", formData.get("subcategory") as string);
  // data.append("brand", formData.get("brand") as string);

  const thumbnail = formData.get("thumbnail") as File;
  data.append("thumbnail", thumbnail);

  const images = formData.getAll("images") as File[];
  images.forEach((img) => {
    data.append("images", img);
  });

  const c = await cookies();
  const access = c.get("accessToken")?.value;

  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      headers: {
        // Authorization: access || "",
        Authorization: `Bearer ${access}`,
      },
      body: data,
    });
    const resData = await result.json();
    if (resData?.data) {
      console.log("✅ Product created successfully");
      return resData.data;
    }
  } catch (error) {
    console.error("❌ Error creating product:", error);
  }
}

export {
  loginData,
  logout,
  getUser,
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
  getProducts,
  getProduct,
  createProduct,
};
