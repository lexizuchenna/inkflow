import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "@/styles/cropper.css";

interface CropProps {
  src: string;
  onCrop: (image: File) => void;
  initialAspectRatio?: number;
}

export default function ImageCropper({
  src,
  onCrop,
  initialAspectRatio,
}: CropProps) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas().toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File([blob], "cropped-image.jpg", {
          type: "image/jpeg",
          lastModified: Date.now(),
        });

        onCrop(file);
      },
      "image/jpeg",
      0.9
    );
  };

  return (
    <Cropper
      src={src}
      style={{ height: 400, width: "100%" }}
      initialAspectRatio={initialAspectRatio ?? 16 / 9}
      guides={false}
      crop={handleCrop}
      ref={cropperRef}
      background={false}
      modal
    />
  );
}
