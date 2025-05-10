import { getProducts } from "@/lib/action";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  price: number;
}

const Page = async () => {
  const allProducts = await getProducts();
  const products = allProducts?.products || [];
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const allProducts = await getProducts();
  //     setProducts(allProducts?.products || []);
  //   };

  //   fetchData();
  // }, []);

  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🛍️ All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: Product) => (
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
              <Link
                href={`/products/${product._id}`}
                className="w-full cursor-pointer py-2 bg-slate-400 rounded-xl hover:bg-slate-700 hover:text-white"
                // onClick={() => console.log(`🛒 Add ${product.title} to cart`)}
              >
                Add to Cart
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Page;
