"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/action";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
  _id: string;
  title: string;
  description: string;
  thumbnail: { url: string };
  images: { url: string }[];
  price: number;
  slug: string;
  category?: string[];
  sku?: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false); // Sheet toggle

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id?.toString() || "");
      setProduct(data.product);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <section className="grid md:grid-cols-2 gap-8 px-4 py-8 max-w-7xl mx-auto">
      {/* Left Images */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex sm:flex-col gap-4">
          {product.images?.map((img, i) => (
            <Image
              key={i}
              src={img.url}
              alt={product.title}
              width={80}
              height={80}
              className="rounded border hover:scale-105 transition"
            />
          ))}
        </div>
        <Image
          src={product.thumbnail?.url}
          alt={product.title}
          width={500}
          height={500}
          className="rounded-xl object-contain"
        />
      </div>

      {/* Right Content */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-green-600 font-semibold text-lg">${product.price}</p>
        <p className="text-sm text-gray-600">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex gap-4 mt-4">
          <div className="flex border rounded w-fit overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 cursor-pointer"
            >
              -
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 cursor-pointer"
            >
              +
            </button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                className="bg-green-600 hover:bg-green-700 cursor-pointer text-white"
                onClick={() => {
                  console.log("Add to Cart", product._id);
                  setOpen(true);
                }}
              >
                ADD TO CART
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>🛒 Products added !</SheetTitle>
                <SheetDescription className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-4 mt-4">
                    <Image
                      src={product.thumbnail?.url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <div>
                      <p className="font-semibold">{product.title}</p>
                      <p>Quantity: {quantity}</p>
                      <p>Price: ${product.price * quantity}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4 bottom-10">
                    <Button className=" capitalize text-black w-full cursor-pointer">
                      See Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full capitalize"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/* Extra Actions */}
        <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600 underline">
          <button>➕ Add to wishlist</button>
          <button>📊 Add to compare</button>
          <button>📐 Size Guide</button>
        </div>

        {/* Details */}
        <div className="pt-4 text-sm space-y-2">
          <p>
            <strong>SKU:</strong> {product.sku || "MNK-XXXX"}
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {product.category?.join(", ") || "Uncategorized"}
          </p>
          <p className="flex gap-2">
            <strong>Share:</strong>
            <span>🌐 Facebook</span>
            <span>📨 Twitter</span>
            <span>💼 LinkedIn</span>
          </p>
        </div>
      </div>
    </section>
  );
}
