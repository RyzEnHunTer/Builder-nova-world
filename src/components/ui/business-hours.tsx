import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Clock,
  MapPin,
  Phone,
  Globe,
  RefreshCw,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { useBusinessProfile } from "@/lib/googleBusinessProfile";
import { cn } from "@/lib/utils";

interface BusinessHoursDisplayProps {
  variant?: "full" | "compact" | "status-only";
  showSync?: boolean;
  className?: string;
}

const BusinessHoursDisplay = ({
  variant = "full",
  showSync = false,
  className,
}: BusinessHoursDisplayProps) => {
  const {
    profileInfo,
    loading,
    syncing,
    getBusinessStatus,
    formatBusinessHours,
    forceSyncProfile,
    lastSyncTime,
  } = useBusinessProfile();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const businessStatus = getBusinessStatus();
  const businessHours = formatBusinessHours();

  if (variant === "status-only") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {businessStatus.isOpen ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-red-500" />
        )}
        <span
          className={cn(
            "text-sm font-medium",
            businessStatus.isOpen ? "text-green-700" : "text-red-700",
          )}
        >
          {businessStatus.status}
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={cn("", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Hours</span>
            </div>
            <Badge
              variant={businessStatus.isOpen ? "default" : "secondary"}
              className={
                businessStatus.isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {businessStatus.status}
            </Badge>
          </div>

          {businessHours.length > 0 && (
            <div className="mt-3 space-y-1">
              {businessHours.slice(0, 3).map((day) => (
                <div
                  key={day.day}
                  className={cn(
                    "flex justify-between text-sm",
                    day.isToday ? "font-medium text-blue-600" : "text-gray-600",
                  )}
                >
                  <span>{day.day}</span>
                  <span>{day.timeRange}</span>
                </div>
              ))}
              {businessHours.length > 3 && (
                <div className="text-xs text-gray-500 text-center pt-1">
                  +{businessHours.length - 3} more days
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Full variant
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Business Hours
          </CardTitle>

          <div className="flex items-center gap-2">
            <Badge
              variant={businessStatus.isOpen ? "default" : "secondary"}
              className={
                businessStatus.isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {businessStatus.status}
            </Badge>

            {showSync && (
              <Button
                variant="outline"
                size="sm"
                onClick={forceSyncProfile}
                disabled={syncing}
                className="h-7 px-2"
              >
                <RefreshCw
                  className={cn("h-3 w-3", syncing && "animate-spin")}
                />
              </Button>
            )}
          </div>
        </div>

        {profileInfo?.location && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{profileInfo.location.fullAddress}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Business Hours */}
        <div className="space-y-2">
          {businessHours.map((day) => (
            <div
              key={day.day}
              className={cn(
                "flex justify-between items-center py-2 px-3 rounded-lg",
                day.isToday
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-gray-50",
              )}
            >
              <div className="flex items-center gap-2">
                {day.isToday && <Calendar className="h-4 w-4 text-blue-600" />}
                <span
                  className={cn(
                    "font-medium",
                    day.isToday ? "text-blue-800" : "text-gray-800",
                  )}
                >
                  {day.day}
                </span>
                {day.isToday && (
                  <Badge variant="outline" className="text-xs">
                    Today
                  </Badge>
                )}
              </div>

              <span
                className={cn(
                  "font-medium",
                  day.closed
                    ? "text-red-600"
                    : day.isToday
                      ? "text-blue-600"
                      : "text-gray-600",
                )}
              >
                {day.timeRange}
              </span>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        {profileInfo?.contact && (
          <div className="border-t pt-4 space-y-2">
            {profileInfo.contact.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <a
                  href={`tel:${profileInfo.contact.phone}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {profileInfo.contact.phone}
                </a>
              </div>
            )}

            {profileInfo.contact.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-gray-500" />
                <a
                  href={profileInfo.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        )}

        {/* Sync Information */}
        {showSync && lastSyncTime && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <RefreshCw className="h-3 w-3" />
              <span>
                Last synced: {new Date(lastSyncTime).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessHoursDisplay;
