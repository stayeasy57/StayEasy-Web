"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  useGetContactUsByIdQuery,
  useUpdateReadContactStatusMutation,
  useUpdateContactMutation, // NEW IMPORT
} from "@/store/api/apiSlice";
import {
  ArrowLeft,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Send,
  Loader2,
  AlertCircle,
  RefreshCw,
  Settings,
  HelpCircle,
  CreditCard,
  Home,
  User,
  Calendar,
  Badge,
  AlertTriangle,
  FileText,
  MapPin,
  Monitor,
  Globe,
  Save,
  Copy,
  ExternalLink,
  Eye,
  CheckCheck,
} from "lucide-react";

const ContactUsDetails: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const contactId = params.id as string;

  // State for editing and responses
  const [isEditing, setIsEditing] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // NEW STATE
  const [selectedPriority, setSelectedPriority] = useState(""); // NEW STATE
  const [respondedBy, setRespondedBy] = useState(""); // NEW STATE
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // NEW STATE

  // Fetch contact details
  const {
    data: contactDetailsApi,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetContactUsByIdQuery(contactId);

  // Update contact mutations
  const [updateContact, { isLoading: isUpdating }] = useUpdateReadContactStatusMutation();
  const [updateFullContact, { isLoading: isFullUpdating }] = useUpdateContactMutation(); // NEW MUTATION

  // Initialize states when data loads
  React.useEffect(() => {
    if (contactDetailsApi?.data) {
      setSelectedStatus(contactDetailsApi.data.status);
      setSelectedCategory(contactDetailsApi.data.category);
      setSelectedPriority(contactDetailsApi.data.priority);
      setAdminResponse(contactDetailsApi.data.adminResponse || "");
      setRespondedBy("Ahmad Khan (Admin)"); // Default admin name
    }
  }, [contactDetailsApi]);

  // Handle status update (quick update)
  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateFullContact({
        id: parseInt(contactId),
        status: newStatus,
      }).unwrap();
      setSelectedStatus(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Handle full contact update (comprehensive update)
  const handleFullContactUpdate = async () => {
    try {
      await updateFullContact({
        id: parseInt(contactId),
        status: selectedStatus,
        category: selectedCategory,
        priority: selectedPriority,
        adminResponse: adminResponse.trim() || undefined,
        respondedBy: respondedBy.trim() || undefined,
        isRead: true,
      }).unwrap();
      setShowEditModal(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  // Handle admin response (legacy method - keep for backward compatibility)
  const handleSendResponse = async () => {
    if (!adminResponse.trim()) return;

    try {
      await updateContact({
        id: parseInt(contactId),
        adminResponse: adminResponse,
        status: selectedStatus === "PENDING" ? "IN_PROGRESS" : selectedStatus,
      }).unwrap();
      setShowResponseModal(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to send response:", error);
    }
  };

  // Handle comprehensive response with full update
  const handleSendFullResponse = async () => {
    if (!adminResponse.trim()) return;

    try {
      await updateFullContact({
        id: parseInt(contactId),
        status: selectedStatus === "PENDING" ? "IN_PROGRESS" : selectedStatus,
        category: selectedCategory,
        priority: selectedPriority,
        adminResponse: adminResponse,
        respondedBy: respondedBy,
        isRead: true,
      }).unwrap();
      setShowResponseModal(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to send response:", error);
    }
  };

  // Handle mark as read
  const handleMarkAsRead = async () => {
    if (contactDetailsApi?.data && !contactDetailsApi.data.isRead) {
      try {
        await updateContact({
          id: parseInt(contactId),
          isRead: true,
        }).unwrap();
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  // Mark as read when component loads
  React.useEffect(() => {
    handleMarkAsRead();
  }, [contactDetailsApi]);

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "TECHNICAL_SUPPORT":
        return Settings;
      case "GENERAL_INQUIRY":
        return HelpCircle;
      case "BILLING":
        return CreditCard;
      case "TENANT_SUPPORT":
        return Home;
      case "PROPERTY_LISTING":
        return FileText;
      case "LANDLORD_SUPPORT":
        return User;
      default:
        return MessageSquare;
    }
  };

  // Get status config
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          description: "Awaiting admin response",
        };
      case "IN_PROGRESS":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: RefreshCw,
          description: "Being worked on",
        };
      case "RESOLVED":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          description: "Issue has been resolved",
        };
      case "CLOSED":
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: XCircle,
          description: "Case closed",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          description: "Unknown status",
        };
    }
  };

  // Get priority config
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: AlertTriangle,
          description: "Requires immediate attention",
        };
      case "HIGH":
        return {
          color: "bg-orange-100 text-orange-800 border-orange-200",
          icon: AlertTriangle,
          description: "High priority issue",
        };
      case "MEDIUM":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Badge,
          description: "Standard priority",
        };
      case "LOW":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: Badge,
          description: "Low priority issue",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Badge,
          description: "Unknown priority",
        };
    }
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Loading component
  const LoadingState = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading contact details...</p>
      </div>
    </div>
  );

  // Error component
  const ErrorState = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Failed to Load Contact
        </h2>
        <p className="text-gray-600 mb-6">
          {(error as any)?.data?.message ||
            (error as any)?.message ||
            "Something went wrong while loading the contact details."}
        </p>
        <div className="space-x-3">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  // Enhanced edit modal for comprehensive contact editing
  const EditModal = () => {
    if (!showEditModal) return null;

    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Contact Details
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Contact Overview */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Contact Overview</h3>
              <p className="text-sm text-gray-600">
                <strong>From:</strong> {contact.firstName} {contact.lastName} ({contact.email})
              </p>
              <p className="text-sm text-gray-600">
                <strong>Subject:</strong> {contact.subject}
              </p>
            </div>

            {/* Status, Category, Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="GENERAL_INQUIRY">General Inquiry</option>
                  <option value="TECHNICAL_SUPPORT">Technical Support</option>
                  <option value="BILLING">Billing</option>
                  <option value="TENANT_SUPPORT">Tenant Support</option>
                  <option value="LANDLORD_SUPPORT">Landlord Support</option>
                  <option value="PROPERTY_LISTING">Property Listing</option>
                  <option value="PARTNERSHIP">Partnership</option>
                  <option value="FEEDBACK">Feedback</option>
                  <option value="COMPLAINT">Complaint</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>

            {/* Admin Response */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Response
              </label>
              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your response here..."
              />
            </div>

            {/* Responded By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responded By
              </label>
              <input
                type="text"
                value={respondedBy}
                onChange={(e) => setRespondedBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter admin name..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFullContactUpdate}
                disabled={isFullUpdating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFullUpdating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced response modal
  const ResponseModal = () => {
    if (!showResponseModal) return null;

    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Send Response
              </h2>
              <button
                onClick={() => setShowResponseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Responding to: <strong>{contact.subject}</strong>
              </p>
              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                {contact.message}
              </div>
            </div>

            {/* Enhanced response controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="GENERAL_INQUIRY">General Inquiry</option>
                  <option value="TECHNICAL_SUPPORT">Technical Support</option>
                  <option value="BILLING">Billing</option>
                  <option value="TENANT_SUPPORT">Tenant Support</option>
                  <option value="LANDLORD_SUPPORT">Landlord Support</option>
                  <option value="PROPERTY_LISTING">Property Listing</option>
                  <option value="PARTNERSHIP">Partnership</option>
                  <option value="FEEDBACK">Feedback</option>
                  <option value="COMPLAINT">Complaint</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response
              </label>
              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your response here..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responded By
              </label>
              <input
                type="text"
                value={respondedBy}
                onChange={(e) => setRespondedBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter admin name..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowResponseModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFullResponse}
                disabled={isFullUpdating || !adminResponse.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFullUpdating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send Response</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <LoadingState />;
  if (isError || !contactDetailsApi?.data) return <ErrorState />;

  const contact = contactDetailsApi.data;
  const statusConfig = getStatusConfig(contact.status);
  const priorityConfig = getPriorityConfig(contact.priority);
  const CategoryIcon = getCategoryIcon(contact.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Contact List</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Contact Details #{contact.id}
              </h1>
              <p className="text-gray-600 mt-2">
                Submitted on {formatDate(contact.createdAt)}
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setShowEditModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </button>

              <button
                onClick={() => setShowResponseModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Response
              </button>

              <select
                value={selectedStatus}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>

              <button
                onClick={() => refetch()}
                className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Message */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                  {contact.subject}
                </h2>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Response Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Admin Response
                  </h2>
                  {!contact.adminResponse && (
                    <button
                      onClick={() => setShowResponseModal(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Add Response
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                {contact.adminResponse ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {contact.adminResponse}
                      </p>
                    </div>
                    {contact.respondedAt && (
                      <div className="flex items-center text-sm text-gray-500">
                        <CheckCheck className="w-4 h-4 mr-2" />
                        <span>
                          Responded on {formatDate(contact.respondedAt)}
                          {contact.respondedBy && ` by ${contact.respondedBy}`}
                        </span>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowResponseModal(true)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Update Response
                      </button>
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Edit All Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No response sent yet</p>
                    <button
                      onClick={() => setShowResponseModal(true)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Response
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {contact.firstName.charAt(0)}
                      {contact.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{contact.email}</p>
                      <button
                        onClick={() => copyToClipboard(contact.email)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Copy email
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{contact.phoneNumber}</p>
                      <button
                        onClick={() => copyToClipboard(contact.phoneNumber)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Copy phone
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Priority */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Status & Priority
                  </h3>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Status
                  </label>
                  <div
                    className={`inline-flex items-center px-3 py-2 rounded-md border ${statusConfig.color}`}
                  >
                    <statusConfig.icon className="w-4 h-4 mr-2" />
                    <span className="font-medium">{contact.status.replace("_", " ")}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {statusConfig.description}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Priority
                  </label>
                  <div
                    className={`inline-flex items-center px-3 py-2 rounded-md border ${priorityConfig.color}`}
                  >
                    <priorityConfig.icon className="w-4 h-4 mr-2" />
                    <span className="font-medium">{contact.priority}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {priorityConfig.description}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <div className="inline-flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-200">
                    <CategoryIcon className="w-4 h-4 mr-2" />
                    <span className="font-medium">
                      {contact.category
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Technical Details
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    IP Address
                  </label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{contact.ipAddress}</span>
                    <button
                      onClick={() => copyToClipboard(contact.ipAddress)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    User Agent
                  </label>
                  <div className="flex items-start space-x-2">
                    <Monitor className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-900 break-all leading-relaxed">
                      {contact.userAgent}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Read Status
                  </label>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {contact.isRead ? "Read" : "Unread"}
                    </span>
                    {contact.readAt && (
                      <span className="text-xs text-gray-500">
                        on {formatDate(contact.readAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Contact submitted
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(contact.createdAt)}
                      </p>
                    </div>
                  </div>

                  {contact.readAt && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Marked as read
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(contact.readAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {contact.respondedAt && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Admin responded
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(contact.respondedAt)}
                          {contact.respondedBy && ` by ${contact.respondedBy}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {contact.updatedAt !== contact.createdAt && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Last updated
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(contact.updatedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <ResponseModal />
        <EditModal />
      </div>
    </div>
  );
};

export default ContactUsDetails;