export const queryServer = async (customRequest) => {
  try {
    const response = await customRequest();

    return { data: response, error: null, status: null, ok: true };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    const errorStatus = error.response ? error.response.status : 503;
    return { data: null, error: message, status: errorStatus, ok: false };
  }
};
