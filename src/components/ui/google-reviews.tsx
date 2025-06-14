import { useState } from "react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Alert, AlertDescription } from "./alert";
import {
  Star,
  ExternalLink,
  RefreshCw,
  MapPin,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  Quote,
  Shield,
} from "lucide-react";
import {
  useGoogleReviews,
  generateStarsArray,
  formatRelativeTime,
} from "@/lib/googleReviews";

interface GoogleReviewsProps {
  showBusinessInfo?: boolean;
  maxReviews?: number;
  showRefreshButton?: boolean;
  compact?: boolean;
}

const GoogleReviews = ({
  showBusinessInfo = false,
  maxReviews = 3,
  showRefreshButton = false,
  compact = false,
}: GoogleReviewsProps) => {
  const {
    reviews,
    businessInfo,
    loading,
    error,
    refreshReviews,
    getLatestReviews,
  } = useGoogleReviews();

  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayReviews = showAllReviews
    ? reviews
    : getLatestReviews(maxReviews);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-5 w-5 animate-spin text-rose-500" />
          <span className="text-gray-600">Loading Google Reviews...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}. Showing sample reviews for demonstration.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Business Info Header */}
      {showBusinessInfo && businessInfo && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {businessInfo.name}
                  </h3>
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Google Verified
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    {generateStarsArray(businessInfo.averageRating).map(
                      (filled, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            filled
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ),
                    )}
                    <span className="text-lg font-semibold text-gray-900 ml-2">
                      {businessInfo.averageRating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      {businessInfo.totalReviews} reviews
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{businessInfo.address}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessInfo.name)}&query_place_id=${businessInfo.placeId}`,
                    "_blank",
                  )
                }
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Google
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`font-bold text-gray-900 ${compact ? "text-lg" : "text-2xl"}`}
          >
            Google Reviews
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Real reviews from our valued customers
          </p>
        </div>

        <div className="flex items-center gap-2">
          {showRefreshButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={refreshReviews}
              disabled={loading}
              className="border-rose-300 text-rose-600 hover:bg-rose-50"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          )}

          <Badge className="bg-rose-100 text-rose-600">
            <Shield className="h-3 w-3 mr-1" />
            Live from Google
          </Badge>
        </div>
      </div>

      {/* Reviews Grid */}
      <div
        className={`grid gap-6 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
      >
        {displayReviews.map((review) => (
          <Card
            key={review.id}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardContent className={compact ? "p-4" : "p-6"}>
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {review.reviewerName}
                    </h4>
                    <div className="flex items-center gap-1">
                      {generateStarsArray(review.rating).map(
                        (filled, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              filled
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {review.isLocalGuide && (
                  <Badge variant="secondary" className="text-xs">
                    Local Guide
                  </Badge>
                )}
              </div>

              {/* Review Text */}
              <div className="mb-4">
                <Quote className="h-4 w-4 text-gray-400 mb-2" />
                <p
                  className={`text-gray-700 leading-relaxed ${compact ? "text-sm" : ""}`}
                >
                  {review.text}
                </p>
              </div>

              {/* Review Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{review.relativeTimeDescription}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  <span>Google</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > maxReviews && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="border-rose-300 text-rose-600 hover:bg-rose-50"
          >
            {showAllReviews ? (
              <>Show Less Reviews</>
            ) : (
              <>Show All {reviews.length} Reviews</>
            )}
          </Button>
        </div>
      )}

      {/* Google Reviews CTA */}
      <Card className="border-2 border-dashed border-rose-300 bg-rose-50">
        <CardContent className="p-6 text-center">
          <Star className="h-12 w-12 text-rose-400 mx-auto mb-4" />
          <h4 className="font-semibold text-rose-800 mb-2">
            Love Our Service?
          </h4>
          <p className="text-rose-600 text-sm mb-4">
            Share your experience with others by leaving a Google review!
          </p>
          <Button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Dream World Beauty Parlour")}&query_place_id=${businessInfo?.placeId}`,
                "_blank",
              )
            }
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
          >
            <Star className="h-4 w-4 mr-2" />
            Write a Google Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleReviews;
