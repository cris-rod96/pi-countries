export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_LOCAL
    : import.meta.env.VITE_BACKEND_DEPLOY;
