import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Alert, AlertDescription } from "./alert";
import GoogleReviews from "./google-reviews";
import {
  ExternalLink,
  Settings,
  Key,
  MapPin,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Eye,
} from "lucide-react";

const GoogleReviewsManager = () => {
  const [placeId, setPlaceId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  const handleSaveConfig = () => {
    // In production, these would be saved securely
    localStorage.setItem("google-place-id", placeId);
    localStorage.setItem("google-api-key", apiKey);
    alert(
      "Configuration saved! Note: In production, these should be environment variables.",
    );
  };

  const handleFindPlaceId = () => {
    window.open(
      "https://developers.google.com/maps/documentation/places/web-service/place-id",
      "_blank",
    );
  };

  const handleGetApiKey = () => {
    window.open("https://console.developers.google.com/", "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Google Reviews Integration
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage your Google Reviews integration to show real customer reviews
            on your website automatically.
          </p>
        </CardHeader>
      </Card>

      {/* Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Setup Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Place ID
              </label>
              <div className="flex gap-2">
                <Input
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                  placeholder="Enter your Google Place ID"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleFindPlaceId}
                  className="border-blue-300 text-blue-600"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click the map icon to find your Place ID
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Places API Key
              </label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleGetApiKey}
                  className="border-green-300 text-green-600"
                >
                  <Key className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click the key icon to get your API key
              </p>
            </div>

            <Button
              onClick={handleSaveConfig}
              disabled={!placeId || !apiKey}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Status & Information */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Demo reviews are active</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">Real Google API not configured</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Auto-refresh: Every 24 hours</span>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <strong>Currently showing demo reviews.</strong> Configure your
                Google Place ID and API key to show real reviews from your
                Google Business Profile.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Quick Actions:</h4>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open("https://business.google.com/", "_blank")
                  }
                  className="justify-start"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Manage Google Business Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? "Hide" : "Show"} Preview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup Instructions */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-yellow-700">
            <div>
              <h4 className="font-semibold mb-2">
                Step 1: Get Google Place ID
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to Google Maps and search for your business</li>
                <li>Click on your business listing</li>
                <li>
                  Copy the Place ID from the URL or use the Place ID Finder
                </li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                Step 2: Get Google Places API Key
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to Google Cloud Console</li>
                <li>Create a new project or select existing one</li>
                <li>Enable the Places API</li>
                <li>Create credentials (API Key)</li>
                <li>Restrict the key to Places API for security</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                Step 3: Configure Environment Variables
              </h4>
              <div className="bg-white p-3 rounded border text-xs font-mono">
                VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
                <br />
                VITE_GOOGLE_PLACE_ID=your_place_id_here
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {showPreview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Reviews Preview
            </CardTitle>
            <p className="text-sm text-gray-600">
              This is how your Google reviews will appear on the website
            </p>
          </CardHeader>
          <CardContent>
            <GoogleReviews
              showBusinessInfo={true}
              maxReviews={3}
              showRefreshButton={true}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleReviewsManager;
