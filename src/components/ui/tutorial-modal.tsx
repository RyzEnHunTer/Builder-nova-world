import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import {
  HelpCircle,
  FolderPlus,
  Upload,
  Edit3,
  Eye,
  CheckCircle,
  ArrowRight,
  Image,
  FileText,
  Save,
} from "lucide-react";

const TutorialModal = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. Prepare Your Image",
      icon: Image,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            First, take a high-quality photo of your beauty work and save it
            with a descriptive name.
          </p>
          <div className="bg-rose-50 p-4 rounded-lg">
            <h4 className="font-semibold text-rose-800 mb-2">
              Good filename examples:
            </h4>
            <ul className="text-sm text-rose-700 space-y-1">
              <li>• hair-transformation-before-after.jpg</li>
              <li>• bridal-makeup-traditional.jpg</li>
              <li>• facial-glow-treatment.jpg</li>
              <li>• spa-relaxing-massage.jpg</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Tips:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Use hyphens instead of spaces</li>
              <li>• Keep names descriptive but short</li>
              <li>• Use .jpg or .png format</li>
              <li>• Aim for 800x600px or larger</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "2. Upload to Correct Folder",
      icon: FolderPlus,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Place your image in the correct category folder in your project.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            <div className="text-gray-800 font-semibold mb-2">
              public/images/
            </div>
            <div className="pl-4 space-y-1 text-gray-600">
              <div>├── hair-styling/ ← Hair cuts, styling, coloring</div>
              <div>├── makeup/ ← All makeup services</div>
              <div>├── bridal/ ← Wedding & engagement looks</div>
              <div>├── facial/ ← Skincare & facial treatments</div>
              <div>��── spa/ ← Massage & wellness</div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              📁 Example: Hair Styling Photo
            </h4>
            <p className="text-sm text-blue-700">
              If you have a haircut photo called "bob-cut-styling.jpg", put it
              in:
              <br />
              <code className="bg-white px-2 py-1 rounded mt-1 inline-block">
                public/images/hair-styling/bob-cut-styling.jpg
              </code>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "3. Go to Manage Images Tab",
      icon: Edit3,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            In the Gallery page, click on the "Manage Images" tab to access the
            image management system.
          </p>
          <div className="border-2 border-dashed border-rose-300 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-lg p-2 shadow-sm border">
                <Eye className="h-5 w-5 text-gray-600" />
                <span className="ml-2 text-sm">View Gallery</span>
              </div>
              <div className="bg-rose-500 text-white rounded-lg p-2 shadow-sm ml-2">
                <Edit3 className="h-5 w-5" />
                <span className="ml-2 text-sm">Manage Images</span>
              </div>
            </div>
            <p className="text-sm text-rose-600">
              👆 Click on "Manage Images" tab
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "4. Select Category",
      icon: CheckCircle,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Choose the category that matches where you uploaded your image.
          </p>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-rose-500 text-white">Hair Styling (0)</Badge>
              <Badge variant="outline">Makeup (0)</Badge>
              <Badge variant="outline">Bridal (0)</Badge>
              <Badge variant="outline">Facial Treatments (0)</Badge>
              <Badge variant="outline">Spa Treatments (0)</Badge>
            </div>
            <p className="text-sm text-gray-500">
              👆 Click the category button where you uploaded your image
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "5. Fill Out Image Details",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Fill out the simple form with your image details.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Image Filename
              </label>
              <div className="bg-white border rounded px-3 py-2 text-sm">
                bob-cut-styling.jpg
              </div>
              <p className="text-xs text-gray-500 mt-1">
                The exact filename you uploaded
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Display Title
              </label>
              <div className="bg-white border rounded px-3 py-2 text-sm">
                Modern Bob Cut Styling
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will be auto-filled from your filename
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <div className="bg-white border rounded px-3 py-2 text-sm h-16">
                Professional bob cut with layered styling
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Optional: Brief description of the service
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "6. Add to Gallery",
      icon: Save,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Click "Add Image to Gallery" and your image will appear immediately!
          </p>
          <div className="text-center">
            <Button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white">
              <FolderPlus className="h-4 w-4 mr-2" />
              Add Image to Gallery
            </Button>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              🎉 Success! Your image will:
            </h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>✅ Appear in the gallery immediately</li>
              <li>✅ Be filterable by category</li>
              <li>✅ Open in lightbox when clicked</li>
              <li>✅ Be saved for future visits</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-rose-300 text-rose-600 hover:bg-rose-50"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          How to Add Images
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>How to Add Images to Your Gallery</DialogTitle>
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? "bg-rose-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < currentStep ? "bg-rose-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current step content */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-100 rounded-lg">
                  {React.createElement(steps[currentStep].icon, {
                    className: "h-6 w-6 text-rose-600",
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {steps[currentStep].title}
                </h3>
              </div>
              {steps[currentStep].content}
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            <Button
              onClick={() =>
                setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
              }
              disabled={currentStep === steps.length - 1}
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {currentStep === steps.length - 1 && (
            <div className="bg-rose-50 p-4 rounded-lg text-center">
              <h4 className="font-semibold text-rose-800 mb-2">
                🚀 Ready to Add Your First Image?
              </h4>
              <p className="text-sm text-rose-600 mb-3">
                Close this tutorial and go to the "Manage Images" tab to get
                started!
              </p>
              <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                Let's Do It!
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
