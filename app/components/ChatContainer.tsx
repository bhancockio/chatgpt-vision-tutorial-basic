"use client";

import React, { useState } from "react";
import Image from "next/image";

function ChatContainer() {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // Limit to first 5 images
      setImages(filesArray);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex space-x-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`upload-preview ${index}`}
              className="h-32"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-violet-50 file:text-violet-700
                       hover:file:bg-violet-100"
        />
      </div>
    </div>
  );
}

export default ChatContainer;
