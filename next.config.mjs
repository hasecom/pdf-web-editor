/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


const nextConfig = {
    webpack: (config) => {
      config.resolve.alias.canvas = false;
      return config;
    },
  };
  
  export default nextConfig;