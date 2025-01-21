const STORAGE_KEYS = {
  FAVORITES: "favorites",
  USER_PREFERENCES: "userPreferences",
  SELECTED_CITY: "selectedCity",
  POSTS: "posts",
};

export const storageService = {
  getFavorites: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || "[]");
  },

  addFavorite: (hospitalId) => {
    const favorites = storageService.getFavorites();
    if (!favorites.includes(hospitalId)) {
      favorites.push(hospitalId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  },

  removeFavorite: (hospitalId) => {
    const favorites = storageService.getFavorites();
    const newFavorites = favorites.filter((id) => id !== hospitalId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
  },

  setUserPreferences: (preferences) => {
    localStorage.setItem(
      STORAGE_KEYS.USER_PREFERENCES,
      JSON.stringify(preferences)
    );
  },

  getUserPreferences: () => {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES) || "{}"
    );
  },

  setSelectedCity: (city) => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_CITY, city);
  },

  getSelectedCity: () => {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_CITY) || "all";
  },

  getPosts: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || "[]");
  },

  savePosts: (posts) => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  },
};
