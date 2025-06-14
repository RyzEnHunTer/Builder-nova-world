// Google Reviews Integration System for Dream World Beauty Parlour

export interface GoogleReview {
  id: string;
  reviewerName: string;
  reviewerPhotoUrl?: string;
  rating: number;
  text: string;
  time: string;
  relativeTimeDescription: string;
  profilePhotoUrl?: string;
  isLocalGuide: boolean;
}

export interface GoogleBusinessInfo {
  name: string;
  placeId: string;
  averageRating: number;
  totalReviews: number;
  address: string;
  phoneNumber: string;
  website: string;
  openingHours: string[];
}

// Google Places API configuration
export interface GooglePlacesConfig {
  apiKey: string;
  placeId: string;
}

// Default configuration (you'll need to add your actual Place ID and API key)
const GOOGLE_CONFIG: GooglePlacesConfig = {
  apiKey: process.env.VITE_GOOGLE_PLACES_API_KEY || "YOUR_API_KEY_HERE",
  placeId: process.env.VITE_GOOGLE_PLACE_ID || "YOUR_PLACE_ID_HERE", // Your business Place ID
};

// Fetch reviews from Google Places API
export const fetchGoogleReviews = async (): Promise<GoogleReview[]> => {
  try {
    // In production, this would call the Google Places API
    // For now, we'll return sample data that matches Google's format

    const sampleReviews: GoogleReview[] = [
      {
        id: "1",
        reviewerName: "Priya Sharma",
        rating: 5,
        text: "Amazing service at Dream World Beauty Parlour! The staff is so professional and my hair looks incredible. Best haircut I've ever had. Highly recommend this place!",
        time: "2024-01-15T10:30:00Z",
        relativeTimeDescription: "2 weeks ago",
        reviewerPhotoUrl: "",
        isLocalGuide: true,
      },
      {
        id: "2",
        reviewerName: "Anjali Singh",
        rating: 5,
        text: "Perfect bridal package! They made me feel like a princess on my wedding day. The makeup artist was so skilled and the hair styling was exactly what I wanted. Thank you Dream World!",
        time: "2024-01-10T14:20:00Z",
        relativeTimeDescription: "3 weeks ago",
        reviewerPhotoUrl: "",
        isLocalGuide: false,
      },
      {
        id: "3",
        reviewerName: "Meera Gupta",
        rating: 5,
        text: "Best facial treatment ever! My skin is glowing and feels so refreshed. The ambiance is lovely and the staff is very caring. Will definitely be back for more treatments!",
        time: "2024-01-05T16:45:00Z",
        relativeTimeDescription: "1 month ago",
        reviewerPhotoUrl: "",
        isLocalGuide: false,
      },
      {
        id: "4",
        reviewerName: "Sita Devi",
        rating: 5,
        text: "Wonderful experience! Very clean salon, friendly staff, and excellent service. Got a complete makeover and I love how I look. Prices are also very reasonable.",
        time: "2023-12-28T11:15:00Z",
        relativeTimeDescription: "1 month ago",
        reviewerPhotoUrl: "",
        isLocalGuide: true,
      },
      {
        id: "5",
        reviewerName: "Kavita Kumari",
        rating: 4,
        text: "Good service and nice atmosphere. The hair styling was great and the staff was professional. Only small issue was the waiting time, but overall very satisfied with the results.",
        time: "2023-12-20T13:30:00Z",
        relativeTimeDescription: "1 month ago",
        reviewerPhotoUrl: "",
        isLocalGuide: false,
      },
      {
        id: "6",
        reviewerName: "Sunita Raj",
        rating: 5,
        text: "Excellent spa treatments! The massage was so relaxing and the facial made my skin feel amazing. The parlour is very hygienic and well-maintained. Highly recommended!",
        time: "2023-12-15T09:45:00Z",
        relativeTimeDescription: "2 months ago",
        reviewerPhotoUrl: "",
        isLocalGuide: false,
      },
    ];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return sampleReviews;

    // Real Google Places API call would look like this:
    /*
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_CONFIG.placeId}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_CONFIG.apiKey}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.result.reviews) {
      return data.result.reviews.map((review: any, index: number) => ({
        id: `google_${index}`,
        reviewerName: review.author_name,
        reviewerPhotoUrl: review.profile_photo_url,
        rating: review.rating,
        text: review.text,
        time: new Date(review.time * 1000).toISOString(),
        relativeTimeDescription: review.relative_time_description,
        isLocalGuide: review.author_url?.includes('localguides') || false,
      }));
    }
    
    return [];
    */
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return [];
  }
};

// Fetch business information from Google Places
export const fetchGoogleBusinessInfo =
  async (): Promise<GoogleBusinessInfo | null> => {
    try {
      // Sample business info
      const businessInfo: GoogleBusinessInfo = {
        name: "Dream World Beauty Parlour",
        placeId: GOOGLE_CONFIG.placeId,
        averageRating: 4.8,
        totalReviews: 127,
        address:
          "Ramjanki mandir gali, Main Town, Ghocho Toli, Simdega, Jharkhand 835223",
        phoneNumber: "+91 98765 43210",
        website: "dreamworldbeauty.com",
        openingHours: [
          "Monday: 9:00 AM – 8:00 PM",
          "Tuesday: 9:00 AM – 8:00 PM",
          "Wednesday: 9:00 AM – 8:00 PM",
          "Thursday: 9:00 AM – 8:00 PM",
          "Friday: 9:00 AM – 8:00 PM",
          "Saturday: 9:00 AM – 8:00 PM",
          "Sunday: 10:00 AM – 6:00 PM",
        ],
      };

      await new Promise((resolve) => setTimeout(resolve, 300));
      return businessInfo;
    } catch (error) {
      console.error("Error fetching business info:", error);
      return null;
    }
  };

// Generate stars display for rating
export const generateStarsArray = (rating: number): boolean[] => {
  return Array.from({ length: 5 }, (_, index) => index < Math.floor(rating));
};

// Format relative time
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

// Hook for using Google Reviews
export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [businessInfo, setBusinessInfo] = useState<GoogleBusinessInfo | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const [reviewsData, businessData] = await Promise.all([
        fetchGoogleReviews(),
        fetchGoogleBusinessInfo(),
      ]);

      setReviews(reviewsData);
      setBusinessInfo(businessData);
      setError(null);
    } catch (err) {
      setError("Failed to load reviews");
      console.error("Error loading Google reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const refreshReviews = () => {
    loadReviews();
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const getReviewsByRating = (rating: number) => {
    return reviews.filter((review) => review.rating === rating);
  };

  const getLatestReviews = (count: number = 3) => {
    return reviews
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, count);
  };

  return {
    reviews,
    businessInfo,
    loading,
    error,
    refreshReviews,
    getAverageRating,
    getReviewsByRating,
    getLatestReviews,
  };
};

// Import React hooks
import { useState, useEffect } from "react";
