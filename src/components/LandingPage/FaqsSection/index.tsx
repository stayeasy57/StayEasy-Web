"use client";
import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

// Add global CSS animations
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.7; }
    100% { transform: scale(1); opacity: 0.5; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  .animate-pulse {
    animation: pulse 3s infinite ease-in-out;
  }
`;

// Define TypeScript interfaces
interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategoryProps {
  title: string;
  faqs: FAQ[];
}

// FAQItem Component
const FAQItem: React.FC<{ faq: FAQ }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gray-200 py-4">
      <div
        className="flex justify-between items-center cursor-pointer transition-all duration-200 ease-in-out hover:text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-medium text-gray-900">{faq.question}</h3>
        <div
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-0" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <MinusCircle className="h-5 w-5 text-blue-500 transition-all duration-300 ease-in-out" />
          ) : (
            <PlusCircle className="h-5 w-5 text-blue-500 transition-all duration-300 ease-in-out" />
          )}
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen
            ? `${contentRef.current ? contentRef.current.scrollHeight : 1000}px`
            : "0px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        <div className="pt-2 pb-1 text-sm text-gray-600">{faq.answer}</div>
      </div>
    </div>
  );
};

// FAQCategory Component
const FAQCategory: React.FC<FAQCategoryProps> = ({ title, faqs }) => {
  return (
    <div className="w-full px-4">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <div className="space-y-1">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <FAQItem faq={faq} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main FAQ Component
const FAQSection: React.FC = () => {
  // Dummy data
  const landlordFAQs: FAQ[] = [
    {
      question: "How can I list my property?",
      answer:
        "Simply sign up as a landlord, fill in your property details, and submit your listing for approval.",
    },
    {
      question: "What is your favorite temple there a fee to list my property?",
      answer:
        "We offer both free and premium listing options. The basic listing is completely free, while premium listings offer enhanced visibility and features for a small fee.",
    },
    {
      question: "Can I manage multiple properties?",
      answer:
        "Yes, you can manage multiple properties from a single dashboard. Our platform makes it easy to track and manage all your listings in one place.",
    },
    {
      question: "How do I receive rent payments?",
      answer:
        "Rent payments are processed through our secure payment system and transferred directly to your nominated bank account. You can track all transactions in real-time.",
    },
    {
      question: "How do I handle tenant queries?",
      answer:
        "All tenant queries are managed through our messaging center. You'll receive notifications for new messages and can respond directly through the platform.",
    },
  ];

  const tenantFAQs: FAQ[] = [
    {
      question: "How can I find a hostel/PG near me?",
      answer:
        "Use our search function with filters for location, price range, and amenities to find the perfect accommodation near your desired location.",
    },
    {
      question: "Are the listed hostels/PGs verified?",
      answer:
        "Yes, all listings undergo a verification process. Look for the 'Verified' badge on listings for additional assurance of quality and authenticity.",
    },
    {
      question: "Can I contact the landlord before booking?",
      answer:
        "Absolutely! Our app allows direct communication with landlords. You can ask questions and discuss details before making a decision.",
    },
    {
      question: "Is there any booking fee?",
      answer:
        "We charge a small service fee for bookings to cover platform maintenance and customer support. This fee is clearly shown before you complete your booking.",
    },
    {
      question: "How do I make payments for rent?",
      answer:
        "You can make rent payments directly through our platform using various payment methods including credit/debit cards, net banking, and UPI.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-16 relative">
            <span className="relative z-10">FAQs</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-100 opacity-50 w-24 h-24 rounded-full blur-xl animate-pulse"></div>
            </div>
          </h1>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div
            className="w-full lg:w-1/2 px-4 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            <FAQCategory title="For Landlords" faqs={landlordFAQs} />
          </div>
          <div
            className="w-full lg:w-1/2 px-4 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            <FAQCategory title="For Tenants" faqs={tenantFAQs} />
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqsSection: React.FC = () => {
  // Add styles to document on mount
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return <FAQSection />;
};

export default FaqsSection;
