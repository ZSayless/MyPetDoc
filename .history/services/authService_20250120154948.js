const authService = {
  forgotPassword: async (email) => {
    // Mock function for testing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },
};

export { authService }; 