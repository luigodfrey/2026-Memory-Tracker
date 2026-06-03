import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera } from 'lucide-react';

interface ImageUploaderProps {
  imageSrc: string | null;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: 'h-20',
  medium: 'h-28',
  large: 'h-56',
};

export default function ImageUploader({ imageSrc, onImageUpload, onImageRemove, size = 'medium' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
    // Reset so the same file can be selected again
    e.target.value = '';
  }, [onImageUpload]);

  return (
    <div
      className={`relative ${sizeClasses[size]} w-full rounded-lg overflow-hidden cursor-pointer group transition-all duration-200 hover:shadow-md`}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        {imageSrc ? (
          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <img
              src={imageSrc}
              alt="Memory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageRemove();
              }}
              className="absolute top-1 right-1 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Remove photo"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full bg-white/60 border-2 border-dashed border-current rounded-lg flex flex-col items-center justify-center gap-1 transition-all duration-200 group-hover:bg-white/80"
          >
            <Camera className="w-6 h-6 opacity-50" />
            <span className="text-[10px] opacity-60 font-medium">Add Photo</span>
          </motion.div>
        )}
      </AnimatePresence>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload photo"
      />
    </div>
  );
}
