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
  useBusinessReviews,
  generateReviewUrl,
  openGoogleBusinessProfile,
} from "@/lib/googleBusinessProfile";

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
    profileInfo: businessInfo,
    loading,
    error,
    refreshReviews,
    getLatestReviews,
  } = useBusinessReviews();

  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayReviews = showAllReviews
    ? reviews
    : getLatestReviews(maxReviews);

  const isUsingSampleReviews = reviews.some(
    (review) =>
      review.id.startsWith("sample_") || review.text.includes("[Sample Review"),
  );

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
      {/* Sync Status Alert */}
      {isUsingSampleReviews && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Sample Reviews:</strong> These are demonstration reviews.
            <a href="/admin" className="underline hover:text-yellow-900 ml-1">
              Connect your Google Business Profile
            </a>{" "}
            in the admin panel to show real customer reviews.
          </AlertDescription>
        </Alert>
      )}

      {!isUsingSampleReviews && reviews.length > 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Live Reviews:</strong> Showing real customer reviews from
            your Google Business Profile.
          </AlertDescription>
        </Alert>
      )}

      {/* Business Info Header */}
      {showBusinessInfo && businessInfo && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Star className="h-6 w-6 text-white fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">
                      {businessInfo.businessName}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-700">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(businessInfo.averageRating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">
                        {businessInfo.averageRating.toFixed(1)}
                      </span>
                      <span className="text-sm">
                        ({businessInfo.totalReviews} reviews)
                      </span>
                      {businessInfo.isVerified && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Users className="h-4 w-4" />
                    <span>{businessInfo.totalReviews} Total Reviews</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <MapPin className="h-4 w-4" />
                    <span>Premium Beauty Services</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock className="h-4 w-4" />
                    <span>Professional Team</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    openGoogleBusinessProfile(businessInfo.businessUrl)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
                <Button
                  onClick={() =>
                    window.open(
                      generateReviewUrl(businessInfo.businessUrl),
                      "_blank",
                    )
                  }
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  size="sm"
                >
                  Write Review
                </Button>
              </div>
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
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
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
                generateReviewUrl(businessInfo?.businessUrl),
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
