import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Alert, AlertDescription } from "./alert";
import GoogleReviews from "./google-reviews";
import BusinessProfileSetup from "./business-profile-setup";
import {
  ExternalLink,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Eye,
  Globe,
} from "lucide-react";

const GoogleReviewsManager = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Google Business Profile Reviews
          </CardTitle>
          <p className="text-sm text-gray-600">
            Connect directly to your Google Business Profile to automatically
            sync reviews. Much simpler than API integration - no keys required!
          </p>
        </CardHeader>
      </Card>

      {/* Business Profile Setup */}
      <BusinessProfileSetup />

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
          </CardTitle>
          <p className="text-sm text-gray-600">
            This is how your Google reviews appear on your website
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
    </div>
  );
};

export default GoogleReviewsManager;
