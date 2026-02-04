"use client";

import React from "react";
import Image from "next/image";
import { X, Loader2, UploadCloud } from "lucide-react";

import { useMutation } from "@tanstack/react-query";
import { storyService } from "@/services/story";
import { UploadImageRequest } from "@/services/story/types";
import { useAlert } from "@/providers/alert";

export default function CoverImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const uploadImage = useMutation({
    mutationFn: (data: UploadImageRequest) => storyService.uploadImage(data),
  });

  const alert = useAlert();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage.mutate(
      { image: file },
      {
        onSuccess: (data) => {
          onChange(data.url);
        },
        onError: (error) => {
          alert.error(error.message || "Error uploading image, try again");
        },
      }
    );
  };

  if (value)
    return (
      <div className="relative aspect-video rounded-3xl overflow-hidden group">
        <Image src={value} alt="Cover" fill className="object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
    );

  return (
    <label className="aspect-video bg-foreground/[0.03] border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-foreground/30 hover:border-accent-primary hover:bg-accent-primary/[0.02] transition-all cursor-pointer group">
      {uploadImage.isPending ? (
        <Loader2 className="animate-spin text-accent-primary" size={32} />
      ) : (
        <>
          <UploadCloud
            size={40}
            className="mb-4 group-hover:scale-110 transition-transform"
          />
          <p className="font-bold text-foreground/60">Upload Cover Image</p>
          <p className="text-xs italic">1600 x 900 recommended (PNG, JPG)</p>
        </>
      )}
      <input
        type="file"
        className="hidden"
        onChange={handleUpload}
        accept="image/*"
      />
    </label>
  );
}
