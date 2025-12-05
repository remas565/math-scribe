import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image, X, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadCardProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
  onClear: () => void;
}

export function UploadCard({ onImageUpload, uploadedImage, onClear }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <Card variant="elevated" className="animate-fade-up">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent">
            <FileImage className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Drag & drop or click to upload a math image</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!uploadedImage ? (
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-48 rounded-xl cursor-pointer",
              "border-2 border-dashed transition-all duration-300",
              isDragging
                ? "border-primary bg-accent/50 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:bg-accent/30"
            )}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className={cn(
              "flex flex-col items-center gap-3 transition-transform duration-300",
              isDragging && "scale-110"
            )}>
              <div className={cn(
                "p-4 rounded-2xl transition-all duration-300",
                isDragging ? "bg-primary/10" : "bg-secondary"
              )}>
                <Upload className={cn(
                  "w-8 h-8 transition-colors duration-300",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">
                  {isDragging ? "Drop your image here" : "Choose a file or drag it here"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
            </div>
          </label>
        ) : (
          <div className="relative group">
            <div className="relative rounded-xl overflow-hidden bg-secondary">
              <img
                src={uploadedImage}
                alt="Uploaded math"
                className="w-full h-48 object-contain"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
            </div>
            <Button
              variant="icon"
              size="icon"
              onClick={onClear}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
