import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Upload,
  FolderPlus,
  ImageIcon,
  Trash2,
  Edit3,
  Save,
  X,
  RefreshCw,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import {
  GalleryImage,
  categoryConfigs,
  filenameToTitle,
} from "@/lib/imageScanner";

interface GalleryManagerProps {
  images: GalleryImage[];
  onImagesUpdate: (images: GalleryImage[]) => void;
}

const GalleryManager = ({ images, onImagesUpdate }: GalleryManagerProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Hair Styling");
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [newImageData, setNewImageData] = useState({
    title: "",
    description: "",
    filename: "",
  });

  const categoryImages = images.filter(
    (img) => img.category === selectedCategory,
  );

  const handleAddImage = () => {
    if (!newImageData.filename || !newImageData.title) return;

    const newImage: GalleryImage = {
      id: Math.max(...images.map((img) => img.id), 0) + 1,
      url: `/images/${categoryConfigs.find((c) => c.name === selectedCategory)?.folder}/${newImageData.filename}`,
      alt: `${selectedCategory} - ${newImageData.title}`,
      category: selectedCategory,
      title: newImageData.title,
      description:
        newImageData.description ||
        categoryConfigs.find((c) => c.name === selectedCategory)
          ?.defaultDescription ||
        "",
      filename: newImageData.filename,
    };

    onImagesUpdate([...images, newImage]);
    setNewImageData({ title: "", description: "", filename: "" });
  };

  const handleUpdateImage = () => {
    if (!editingImage) return;

    const updatedImages = images.map((img) =>
      img.id === editingImage.id ? editingImage : img,
    );
    onImagesUpdate(updatedImages);
    setEditingImage(null);
  };

  const handleDeleteImage = (imageId: number) => {
    const updatedImages = images.filter((img) => img.id !== imageId);
    onImagesUpdate(updatedImages);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Gallery Management System
          </CardTitle>
          <p className="text-sm text-gray-600">
            Easily manage your beauty parlour gallery images. Add, edit, or
            remove images from each category.
          </p>
        </CardHeader>
      </Card>

      {/* Category Selector */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select Category</h3>
          <div className="flex flex-wrap gap-2">
            {categoryConfigs.map((category) => (
              <Button
                key={category.name}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.name)}
                className={
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                    : "border-rose-300 text-rose-600 hover:bg-rose-50"
                }
              >
                {category.name} ({categoryImages.length})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Add New Image to {selectedCategory}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Image Filename
              </label>
              <Input
                placeholder="e.g., my-haircut.jpg"
                value={newImageData.filename}
                onChange={(e) =>
                  setNewImageData((prev) => ({
                    ...prev,
                    filename: e.target.value,
                    title: e.target.value
                      ? filenameToTitle(e.target.value)
                      : prev.title,
                  }))
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload your image to: /public/images/
                {
                  categoryConfigs.find((c) => c.name === selectedCategory)
                    ?.folder
                }
                /
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Display Title
              </label>
              <Input
                placeholder="Beautiful Hair Transformation"
                value={newImageData.title}
                onChange={(e) =>
                  setNewImageData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              placeholder="Brief description of the service or transformation"
              value={newImageData.description}
              onChange={(e) =>
                setNewImageData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <Button
            onClick={handleAddImage}
            disabled={!newImageData.filename || !newImageData.title}
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            Add Image to Gallery
          </Button>
        </CardContent>
      </Card>

      {/* Current Images */}
      <Card>
        <CardHeader>
          <CardTitle>Current Images in {selectedCategory}</CardTitle>
          <p className="text-sm text-gray-600">
            {categoryImages.length} images in this category
          </p>
        </CardHeader>
        <CardContent>
          {categoryImages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No images in this category yet.</p>
              <p className="text-sm">Add your first image above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-1">
                      {image.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {image.description}
                    </p>
                    <Badge variant="secondary" className="text-xs mb-3">
                      {image.filename}
                    </Badge>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingImage({ ...image })}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>Edit Image</DialogTitle>
                          {editingImage && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Title
                                </label>
                                <Input
                                  value={editingImage.title}
                                  onChange={(e) =>
                                    setEditingImage((prev) =>
                                      prev
                                        ? { ...prev, title: e.target.value }
                                        : null,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Description
                                </label>
                                <Textarea
                                  value={editingImage.description}
                                  onChange={(e) =>
                                    setEditingImage((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            description: e.target.value,
                                          }
                                        : null,
                                    )
                                  }
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button onClick={handleUpdateImage}>
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setEditingImage(null)}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-dashed border-2 border-rose-300 bg-rose-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-rose-800 mb-4">
            📸 How to Add Images
          </h3>
          <div className="space-y-3 text-sm text-rose-700">
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[20px]">1.</span>
              <span>
                Upload your image files to the public/images/ folder in the
                correct category subdirectory
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[20px]">2.</span>
              <span>
                Use descriptive filenames like "hair-cut-transformation.jpg" or
                "bridal-makeup-look.jpg"
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[20px]">3.</span>
              <span>
                Add the image details using the form above - the system will
                automatically generate the gallery entry
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[20px]">4.</span>
              <span>
                Your images will appear immediately in the gallery with
                filtering and lightbox functionality
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryManager;
