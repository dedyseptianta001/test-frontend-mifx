const env = process.env.NEXT_MODE;

const mode = {
   development: {
      apiUrl: "https://fe.dev.dxtr.asia/api/",
      baseUrl: "",
   },
};

export default mode[env];
