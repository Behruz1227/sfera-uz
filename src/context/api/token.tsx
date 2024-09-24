// Function to dynamically generate the config with authorization header
const token = localStorage.getItem("token")

export const Config = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else
    return {
      headers: {
        Authorization: ``,
      },
    }; // Return an empty config if not in the browser
};

export const config = {
  headers: {
      Authorization: `Bearer ${token}`,
  }
}


// Function to dynamically generate the image config with authorization header
export const ImgConfig = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
  } else
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer `,
      },
    }; // Return an empty config if not in the browser
};

// Functions to update the authorization headers dynamically
// Functions to update the authorization headers dynamically
export const setConfig = () => {
  const config = Config();
  if (typeof window !== "undefined") {
    config.headers.Authorization = `Bearer ${
      token || ""
    }`;
  }
  return config;
};

export const setImgConfig = () => {
  const imgConfig = ImgConfig();
  if (typeof window !== "undefined") {
    imgConfig.headers.Authorization = `Bearer ${
      token || ""
    }`;
  }
  return imgConfig;
};
