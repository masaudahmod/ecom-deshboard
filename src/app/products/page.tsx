// app/products/page.tsx
"use client";

import { getProducts } from "@/lib/action";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  price: number;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts?.products || []);
    };

    fetchData();
  }, []);

  console.log(products);

  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🛍️ ShadCN Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="relative">
            <CardContent className="p-4 flex flex-col items-center text-center">
              {/* Image */}
              <Image
                src={product.thumbnail.url}
                alt={product.title}
                width={180}
                height={180}
                className="object-contain mb-4"
              />

              {/* Info */}
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-500 text-sm mb-1">
                {product.description}
              </p>
              <p className="text-green-600 font-bold mb-3">${product.price}</p>

              {/* Button */}
              <Button
                className="w-full cursor-pointer hover:bg-slate-700 hover:text-white"
                // onClick={() => console.log(`🛒 Add ${product.title} to cart`)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Page;
