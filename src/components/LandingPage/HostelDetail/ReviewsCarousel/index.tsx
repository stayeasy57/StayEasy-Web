import React, { useState, useEffect } from "react";
import AddReviewComponent from "../AddReviewComponent";

interface ReviewData {
  rating: number;
  title: string;
  review: string;
  name: string;
  email: string;
  reviews: any;
}

function ReviewsCarousel(props : any) {

  // props
  const { reviews , propertyId } = props;

  // Reviews data
  // const reviews = [
  //   {
  //     id: 1,
  //     name: "TONNY ALEXON",
  //     date: "DEC 10, 2024",
  //     text: "LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI.",
  //     avatar:
  //       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  //   },
  //   {
  //     id: 2,
  //     name: "SARAH JOHNSON",
  //     date: "NOV 28, 2024",
  //     text: "EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT ANIM ID EST LABORUM. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE CILLUM DOLORE.",
  //     avatar:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  //   },
  //   {
  //     id: 3,
  //     name: "JOHN SMITH",
  //     date: "OCT 15, 2024",
  //     text: "SED UT PERSPICIATIS UNDE OMNIS ISTE NATUS ERROR SIT VOLUPTATEM ACCUSANTIUM DOLOREMQUE LAUDANTIUM, TOTAM REM APERIAM, EAQUE IPSA QUAE AB ILLO INVENTORE VERITATIS ET QUASI ARCHITECTO BEATAE VITAE.",
  //     avatar:
  //       "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  //   },
  //   {
  //     id: 4,
  //     name: "MARIA RODRIGUEZ",
  //     date: "SEP 22, 2024",
  //     text: "AT VERO EOS ET ACCUSAMUS ET IUSTO ODIO DIGNISSIMOS DUCIMUS QUI BLANDITIIS PRAESENTIUM VOLUPTATUM DELENITI ATQUE CORRUPTI QUOS DOLORES ET QUAS MOLESTIAS EXCEPTURI SINT OCCAECATI CUPIDITATE NON.",
  //     avatar:
  //       "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  //   },
  // ];

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("");
  const [isMobile, setIsMobile] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState<any>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const handleReviewSubmit = (reviewData: ReviewData) => {
    console.log("Review submitted:", reviewData);
    // Here you would typically send this data to your API
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update visible reviews when activeIndex changes
  useEffect(() => {
    updateVisibleReviews();
  }, [activeIndex, isMobile]);

  // Update visible reviews based on device
  const updateVisibleReviews = () => {
    if (!reviews) return;
    if (isMobile) {
      setVisibleReviews([reviews[activeIndex]]);
    } else {
      const visibleCards = [];
      for (let i = 0; i < reviews?.length; i++) {
        const index = (activeIndex + i) % reviews.length;
        visibleCards.push(reviews[i]);
      }
    
      setVisibleReviews(visibleCards);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [animating]);

  // Handle navigation
  const goToNext = () => {
    if (animating) return;

    setAnimating(true);
    setAnimationDirection("slide-left");

    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % reviews?.length);

      setTimeout(() => {
        setAnimating(false);
        setAnimationDirection("");
      }, 300);
    }, 300);
  };

  const goToPrev = () => {
    if (animating) return;

    setAnimating(true);
    setAnimationDirection("slide-right");

    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

      setTimeout(() => {
        setAnimating(false);
        setAnimationDirection("");
      }, 300);
    }, 300);
  };

  const goToSlide = (index: any) => {
    if (animating || index === activeIndex) return;

    setAnimating(true);
    setAnimationDirection(index > activeIndex ? "slide-left" : "slide-right");

    setTimeout(() => {
      setActiveIndex(index);

      setTimeout(() => {
        setAnimating(false);
        setAnimationDirection("");
      }, 300);
    }, 300);
  };

  // Get animation classes based on direction
  const getAnimationClass = () => {
    switch (animationDirection) {
      case "slide-left":
        return "animate-slide-left";
      case "slide-right":
        return "animate-slide-right";
      default:
        return "";
    }
  };

  return  (
    <div className="mb-12">
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-slide-left {
          animation: slideOutLeft 0.3s forwards;
        }

        .animate-slide-right {
          animation: slideOutRight 0.3s forwards;
        }

        .animate-slide-in-left {
          animation: slideInRight 0.3s forwards;
        }

        .animate-slide-in-right {
          animation: slideInLeft 0.3s forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s forwards;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>

{
  visibleReviews?.length > 0 ? (

 <div className="relative">
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-blue-50 transition-all hover:scale-110 focus:outline-none"
          aria-label="Previous review"
          disabled={animating}
        >
          <svg
            className="w-6 h-6 text-blue-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-blue-50 transition-all hover:scale-110 focus:outline-none"
          aria-label="Next review"
          disabled={animating}
        >
          <svg
            className="w-6 h-6 text-blue-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      

        {/* Reviews display */}
        <div className="mx-12 overflow-hidden">
          <div
            className={`flex justify-center items-stretch gap-4 ${
              animationDirection ? getAnimationClass() : ""
            }`}
          >

            {visibleReviews && visibleReviews.map((review: any, index: any) => (
              <div
                key={index}
                className={`w-full md:w-1/3 transition-all duration-300 ${
                  !animationDirection && index === 0 ? "animate-fade-in" : ""
                }`}
              >
             
                <div className="h-full border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <img
                      src="/user.png"
                      alt='user'
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-bold">{review?.tenant?.tenantName}</p>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{new Date(review?.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-800">{review?.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center mt-4">
          {reviews?.map((_  :any, index: any) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-blue-600 w-8 animate-pulse"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <p className="text-gray-600">No reviews available</p>
    </div>
  )}
     

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="border border-blue-600 text-blue-600 py-3 px-6 rounded-md font-medium hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-md"
        >
          Add Your Reviews
        </button>
      </div>
      <AddReviewComponent
        isOpen={isReviewModalOpen}
        id={parseInt(propertyId) }
        onClose={() => setIsReviewModalOpen(false)}
        // onSubmit={handleReviewSubmit}
      />
    </div>
  );
}

export default ReviewsCarousel;
