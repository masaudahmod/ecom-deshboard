"use client";

import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  label?: string;
  className?: string;
}

export default function ImageUpload({
  label = "Upload Images",
  className,
}: ImageUploadProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Image Change Handler for multiple images
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]); // আগের ইমেজগুলো রেখে নতুনগুলো যোগ করবো
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  // Image Delete Handler
  const handleDeleteImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Label>{label}</Label>
      <Input
        name="images"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      {/* Image Previews */}
      <div className="flex gap-4 mt-4 flex-wrap">
        {imagePreviews.map((preview, index) => (
          <Card
            key={index}
            className="relative w-32 h-32 p-2 border rounded-lg"
          >
            <CardContent className="p-0 flex justify-center items-center">
              <div className="object-cover w-[150px] h-[150px] overflow-hidden">
                <Image
                  src={preview}
                  alt={`Uploaded Preview ${index + 1}`}
                  width={150}
                  height={100}
                  className="object-cover rounded-md"
                />
              </div>
            </CardContent>
            {/* Delete Button */}
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 p-1 text-xs"
              onClick={() => handleDeleteImage(index)}
            >
              ❌
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
