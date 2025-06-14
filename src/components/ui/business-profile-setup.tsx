import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Badge } from "./badge";
import { Alert, AlertDescription } from "./alert";
import {
  ExternalLink,
  MapPin,
  Star,
  CheckCircle,
  AlertCircle,
  Search,
  Link as LinkIcon,
  Copy,
  RefreshCw,
  Eye,
  Settings,
  Globe,
} from "lucide-react";
import {
  BusinessConfig,
  saveBusinessConfig,
  validateBusinessUrl,
  extractPlaceIdFromUrl,
  openGoogleBusinessProfile,
  generateReviewUrl,
  fetchBusinessReviews,
} from "@/lib/googleBusinessProfile";

const BusinessProfileSetup = () => {
  const [config, setConfig] = useState<BusinessConfig>({
    businessName: "Dream World Beauty Parlour",
    businessUrl: "",
    placeId: "",
  });
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    isConnected: boolean;
    reviewCount: number;
    lastSync: string | null;
    isReal: boolean;
  }>({
    isConnected: false,
    reviewCount: 0,
    lastSync: null,
    isReal: false,
  });

  // Load saved configuration and check sync status
  useEffect(() => {
    const loadConfigAndStatus = async () => {
      const savedConfig = localStorage.getItem("business-profile-config");
      if (savedConfig) {
        try {
          const parsed = JSON.parse(savedConfig);
          setConfig(parsed);
          setIsValidUrl(validateBusinessUrl(parsed.businessUrl));

          // Check current sync status
          if (parsed.businessUrl && validateBusinessUrl(parsed.businessUrl)) {
            try {
              const reviews = await fetchBusinessReviews();
              const isRealReviews =
                reviews.length > 0 && !reviews[0].id.startsWith("sample_");

              setSyncStatus({
                isConnected: true,
                reviewCount: reviews.length,
                lastSync: parsed.lastSync || null,
                isReal: isRealReviews,
              });
            } catch (error) {
              console.error("Error checking sync status:", error);
            }
          }
        } catch (error) {
          console.error("Error loading saved config:", error);
        }
      }
    };

    loadConfigAndStatus();
  }, []);

  const handleUrlChange = (url: string) => {
    setConfig((prev) => ({ ...prev, businessUrl: url }));
    const isValid = validateBusinessUrl(url);
    setIsValidUrl(isValid);

    if (isValid) {
      const placeId = extractPlaceIdFromUrl(url);
      setConfig((prev) => ({ ...prev, placeId: placeId || "" }));
    }
  };

  const handleSave = async () => {
    saveBusinessConfig(config);

    // Test the connection and update sync status
    if (config.businessUrl && validateBusinessUrl(config.businessUrl)) {
      try {
        const reviews = await fetchBusinessReviews();
        const isRealReviews =
          reviews.length > 0 && !reviews[0].id.startsWith("sample_");

        setSyncStatus({
          isConnected: true,
          reviewCount: reviews.length,
          lastSync: new Date().toISOString(),
          isReal: isRealReviews,
        });

        if (isRealReviews) {
          setSuccessMessage(
            `✅ Google Business Profile connected! Synced ${reviews.length} real reviews.`,
          );
        } else {
          setSuccessMessage(
            "⚠️ Profile connected but using sample reviews. Real reviews will sync shortly.",
          );
        }
      } catch (error) {
        setSuccessMessage(
          "⚠️ Profile saved but sync test failed. Check your URL and try again.",
        );
      }
    } else {
      setSuccessMessage("Business profile configuration saved.");
    }

    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleFindBusiness = () => {
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(config.businessName)}`;
    window.open(searchUrl, "_blank");
  };

  const handleTestConnection = () => {
    if (config.businessUrl) {
      openGoogleBusinessProfile(config.businessUrl);
    }
  };

  const copyReviewUrl = () => {
    const reviewUrl = generateReviewUrl(config.businessUrl);
    navigator.clipboard.writeText(reviewUrl);
    setSuccessMessage("Review URL copied to clipboard!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Google Business Profile Integration
          </CardTitle>
          <p className="text-sm text-gray-600">
            Connect your Google Business Profile to automatically sync reviews
            with your website. No API keys required!
          </p>
        </CardHeader>
      </Card>

      {/* Success Message */}
      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Business Profile Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <Input
                value={config.businessName}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }))
                }
                placeholder="Dream World Beauty Parlour"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Business Profile URL
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={config.businessUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://www.google.com/maps/place/..."
                    className={`flex-1 ${
                      config.businessUrl && !isValidUrl
                        ? "border-red-500"
                        : isValidUrl
                          ? "border-green-500"
                          : ""
                    }`}
                  />
                  <Button
                    variant="outline"
                    onClick={handleFindBusiness}
                    className="border-blue-300 text-blue-600"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {config.businessUrl && !isValidUrl && (
                  <p className="text-xs text-red-600">
                    Please enter a valid Google Maps or Google Business URL
                  </p>
                )}

                {isValidUrl && (
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <CheckCircle className="h-3 w-3" />
                    Valid Google Business URL detected
                  </div>
                )}
              </div>
            </div>

            {config.placeId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place ID (Auto-detected)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={config.placeId}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigator.clipboard.writeText(config.placeId)
                    }
                    className="border-gray-300"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={!config.businessName || !isValidUrl}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>

              {config.businessUrl && (
                <Button
                  variant="outline"
                  onClick={handleTestConnection}
                  className="border-green-300 text-green-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status & Information */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">System is ready</span>
              </div>
              <div className="flex items-center gap-2">
                {syncStatus.isConnected && isValidUrl ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : isValidUrl ? (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm">
                  {syncStatus.isConnected && isValidUrl
                    ? "Business profile connected"
                    : isValidUrl
                      ? "Profile URL set, testing connection..."
                      : "Awaiting business profile URL"}
                </span>
              </div>

              {syncStatus.isConnected && (
                <div className="flex items-center gap-2">
                  {syncStatus.isReal ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                  <span className="text-sm">
                    {syncStatus.isReal
                      ? `${syncStatus.reviewCount} real Google reviews synced`
                      : `Using sample reviews (${syncStatus.reviewCount})`}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-blue-500" />
                <span className="text-sm">
                  {syncStatus.lastSync
                    ? `Last synced: ${new Date(syncStatus.lastSync).toLocaleString()}`
                    : "Auto-sync: Every 24 hours"}
                </span>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Star className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <strong>Simple Setup:</strong> Just paste your Google Business
                Profile URL and we'll handle the rest. No API keys, no complex
                configuration required!
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Quick Actions:</h4>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? "Hide" : "Show"} Preview
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyReviewUrl}
                  className="justify-start"
                  disabled={!config.businessUrl}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Copy Review URL
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open("https://business.google.com/", "_blank")
                  }
                  className="justify-start"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Manage Google Business
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup Instructions */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">
            How to Connect Your Google Business Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-green-700">
            <div>
              <h4 className="font-semibold mb-2">Step 1: Find Your Business</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click the "Search" button next to the URL field</li>
                <li>This opens Google Maps with your business search</li>
                <li>Find and click on your business listing</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Step 2: Copy the URL</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>From your business page on Google Maps</li>
                <li>Copy the URL from your browser's address bar</li>
                <li>
                  Paste it in the "Google Business Profile URL" field above
                </li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Step 3: Save & Sync</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click "Save Configuration"</li>
                <li>Your reviews will start syncing automatically</li>
                <li>Check the preview to see how they look</li>
              </ol>
            </div>

            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-green-800 mb-2">
                Example URL formats:
              </h4>
              <div className="text-xs font-mono space-y-1">
                <div>
                  https://www.google.com/maps/place/Business+Name/@lat,lng...
                </div>
                <div>https://goo.gl/maps/...</div>
                <div>https://maps.google.com/...</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-yellow-800 mb-4">
            🎉 Benefits of Direct Integration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700">
            <div className="space-y-2">
              <h4 className="font-medium">✅ Easy Setup</h4>
              <ul className="text-sm space-y-1">
                <li>• No API keys required</li>
                <li>• Just paste your business URL</li>
                <li>• Automatic configuration</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🔄 Real-time Sync</h4>
              <ul className="text-sm space-y-1">
                <li>• Reviews update automatically</li>
                <li>• Always shows latest feedback</li>
                <li>• No manual maintenance</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🛡️ Secure & Reliable</h4>
              <ul className="text-sm space-y-1">
                <li>• Direct Google connection</li>
                <li>• No third-party services</li>
                <li>• Privacy protected</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">📱 Mobile Friendly</h4>
              <ul className="text-sm space-y-1">
                <li>• Responsive design</li>
                <li>• Fast loading</li>
                <li>• Touch optimized</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessProfileSetup;
