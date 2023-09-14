import axiosInstance from '../../functions/axiosInstance';

export const info = async () => {
  const { data } = await axiosInstance.get('/api/me');
  const result = {
    id: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    stores: data.stores?.map((store) => ({
      id: store.id,
      name: store.name,
    })),
  };
  return result;
};
