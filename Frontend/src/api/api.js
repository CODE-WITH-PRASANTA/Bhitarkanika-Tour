// Base API URL (e.g. http://localhost:5000/api)
export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/api`
    : "http://localhost:5000/api");

// Server root URL for uploaded media and static files (e.g. http://localhost:5000)
export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ||
  API_BASE.replace(/\/api\/?$/, "");

/**
 * Helper to build complete image/media URL from relative backend path
 * @param {string} path - Image path, e.g. "/uploads/...", or full URL
 * @returns {string} - Absolute URL
 */
export const getImageUrl = (path) => {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SERVER_URL}${cleanPath}`;
};

/**
 * Centralized Endpoints Registry
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: `${API_BASE}/auth/login`,
  AUTH_REGISTER: `${API_BASE}/auth/register`,
  AUTH_LOGOUT: `${API_BASE}/auth/logout`,
  AUTH_ME: `${API_BASE}/auth/me`,
  AUTH_PROFILE: `${API_BASE}/auth/profile`,
  AUTH_CHANGE_PASSWORD: `${API_BASE}/auth/change-password`,
  AUTH_FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  AUTH_RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  AUTH_GOOGLE: `${API_BASE}/auth/google`,

  // Bookings & Safaris
  TOUR_BOOKINGS: `${API_BASE}/tour-bookings`,

  // Payments
  PAYMENT_CREATE_ORDER: `${API_BASE}/payment/create-order`,
  PAYMENT_VERIFY: `${API_BASE}/payment/verify-payment`,
  PAYMENT_FAILED: `${API_BASE}/payment/payment-failed`,
  PAYMENT_REFUND: `${API_BASE}/payment/refund`,
  PAYMENT_REFUND_REQUESTS: `${API_BASE}/payment/refund-requests`,

  // Explores / Wonders
  EXPLORES: `${API_BASE}/explores`,
  CATEGORIES: `${API_BASE}/categories`,

  // Blogs & Content
  BLOGS: `${API_BASE}/blogs`,
  BLOGS_PUBLISHED: `${API_BASE}/blogs/published`,
  BLOG_CATEGORIES: `${API_BASE}/blog-categories`,
  BLOG_CATEGORIES_ACTIVE: `${API_BASE}/blog-categories?active=true`,
  BLOG_COMMENTS: `${API_BASE}/blog-comments`,

  // Gallery
  GALLERY: `${API_BASE}/gallery`,

  // Enquiries
  ENQUIRIES: `${API_BASE}/enquiries`,

  // Testimonials
  TESTIMONIALS: `${API_BASE}/testimonials`,
  TESTIMONIALS_ACTIVE: `${API_BASE}/testimonials?status=Active`,
};

export default API_BASE;
