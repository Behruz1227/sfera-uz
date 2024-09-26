// Function to dynamically generate the config with authorization header
export const Config = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token || ""}`, // Safeguard if token is null
      },
    };
  }
  // Return an empty config if not in the browser
  return {
    headers: {
      Authorization: ``,
    },
  };
};

// Function to dynamically generate the image config with authorization header
export const ImgConfig = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token || ""}`, // Safeguard if token is null
      },
    };
  }
  // Return an empty config if not in the browser
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer `,
    },
  };
};

// Functions to update the authorization headers dynamically
export const setConfig = () => {
  const config = Config();
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token || ""}`; // Update the token dynamically
  }
  return config;
};

export const setImgConfig = () => {
  const imgConfig = ImgConfig();
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    imgConfig.headers.Authorization = `Bearer ${token || ""}`; // Update the token dynamically
  }
  return imgConfig;
};
