import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  Image,
  Users,
  Settings,
  BarChart3,
  Camera,
  FolderPlus,
  Trash2,
  Edit3,
  Save,
  LogOut,
  Shield,
  CheckCircle,
  AlertCircle,
  FileImage,
  Phone,
  Star,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import GalleryManager from "@/components/ui/gallery-manager";
import ContactInfoEditor from "@/components/ui/contact-info-editor";
import GoogleReviewsManager from "@/components/ui/google-reviews-manager";
import {
  GalleryImage,
  categoryConfigs,
  filenameToTitle,
} from "@/lib/imageScanner";

const AdminDashboard = () => {
  const { user, logout } = useAdmin();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState("overview");
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Hair Styling");
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Load saved images
  useState(() => {
    const savedImages = localStorage.getItem("dreamworld-gallery-images");
    if (savedImages) {
      try {
        setGalleryImages(JSON.parse(savedImages));
      } catch (error) {
        console.error("Error loading saved images:", error);
      }
    }
  });

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newUploadProgress: string[] = [];

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file. Please upload only images.`);
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert(
          `${file.name} is too large. Please upload images smaller than 5MB.`,
        );
        return;
      }

      newUploadProgress.push(file.name);

      // Simulate file processing and create gallery entry
      setTimeout(() => {
        const newImage: GalleryImage = {
          id: Math.max(...galleryImages.map((img) => img.id), 0) + 1,
          url: `/images/${categoryConfigs.find((c) => c.name === selectedCategory)?.folder}/${file.name}`,
          alt: `${selectedCategory} - ${filenameToTitle(file.name)}`,
          category: selectedCategory,
          title: filenameToTitle(file.name),
          description:
            categoryConfigs.find((c) => c.name === selectedCategory)
              ?.defaultDescription || "",
          filename: file.name,
        };

        const updatedImages = [...galleryImages, newImage];
        setGalleryImages(updatedImages);
        localStorage.setItem(
          "dreamworld-gallery-images",
          JSON.stringify(updatedImages),
        );

        setUploadProgress((prev) => prev.filter((name) => name !== file.name));
        setSuccessMessage(`${file.name} uploaded successfully!`);

        setTimeout(() => setSuccessMessage(""), 3000);
      }, 1000);
    });

    setUploadProgress(newUploadProgress);

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImagesUpdate = (updatedImages: GalleryImage[]) => {
    setGalleryImages(updatedImages);
    localStorage.setItem(
      "dreamworld-gallery-images",
      JSON.stringify(updatedImages),
    );
  };

  const stats = {
    totalImages: galleryImages.length,
    categoryCounts: categoryConfigs.map((cat) => ({
      name: cat.name,
      count: galleryImages.filter((img) => img.category === cat.name).length,
    })),
    recentUploads: galleryImages.slice(-5).reverse(),
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "gallery", name: "Gallery Management", icon: Image },
    { id: "upload", name: "Quick Upload", icon: Upload },
    { id: "contact", name: "Contact Info", icon: Phone },
    { id: "reviews", name: "Google Reviews", icon: Star },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Dream World Beauty Parlour
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-green-500 text-white">
                <Users className="h-3 w-3 mr-1" />
                {user?.role}
              </Badge>
              <span className="text-sm text-gray-600">
                Welcome, {user?.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Image className="h-8 w-8 text-rose-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Images
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalImages}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {stats.categoryCounts.slice(0, 3).map((cat, index) => (
                <Card key={cat.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Camera className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          {cat.name}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {cat.count}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentUploads.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recentUploads.map((image) => (
                      <div
                        key={image.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileImage className="h-8 w-8 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {image.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {image.category}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{image.filename}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No images uploaded yet. Start by uploading your first image!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <GalleryManager
              images={galleryImages}
              onImagesUpdate={handleImagesUpdate}
            />
          </div>
        )}

        {activeTab === "upload" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Quick Image Upload
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Upload multiple images quickly to your selected category
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categoryConfigs.map((category) => (
                      <Button
                        key={category.name}
                        variant={
                          selectedCategory === category.name
                            ? "default"
                            : "outline"
                        }
                        onClick={() => setSelectedCategory(category.name)}
                        className={
                          selectedCategory === category.name
                            ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                            : "border-rose-300 text-rose-600 hover:bg-rose-50"
                        }
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-rose-300 rounded-lg p-8 text-center bg-rose-50">
                  <Upload className="h-12 w-12 text-rose-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop files here or click to upload
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Upload to: <strong>{selectedCategory}</strong> category
                  </p>
                  <Button
                    onClick={triggerFileUpload}
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                  >
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Supports: JPG, PNG, WebP • Max size: 5MB each
                  </p>
                </div>

                {/* Upload Progress */}
                {uploadProgress.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Uploading...</h4>
                    {uploadProgress.map((filename) => (
                      <div
                        key={filename}
                        className="flex items-center gap-2 p-2 bg-blue-50 rounded"
                      >
                        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        <span className="text-sm text-blue-700">
                          {filename}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      {successMessage}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <ContactInfoEditor />
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <GoogleReviewsManager />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    🔒 Security Recommendations
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Change default passwords in production</li>
                    <li>• Regular backup of gallery images</li>
                    <li>• Monitor admin access logs</li>
                    <li>• Use HTTPS in production</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    📁 File Organization
                  </h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Images should be organized in these folders:
                  </p>
                  <div className="text-xs text-blue-600 font-mono bg-white p-2 rounded">
                    {categoryConfigs.map((cat) => (
                      <div key={cat.name}>public/images/{cat.folder}/</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
