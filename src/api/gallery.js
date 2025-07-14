import { adminApi, publicApi } from "./config";


export const getAllGalleryImages = async () => {
  const response = await publicApi.get("/public/images/getAll");
  return response.data.data; 
};

export const addGalleryImage = async (data) => {
  return await adminApi.post("/admin/images/add", data); // data includes { title, imageBase64 }
};

export const updateGalleryImage = async (id, imageFile, title) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("title", title);
  return adminApi.put(`/admin/images/update/${id}`, formData);
};

export const deleteGalleryImage = async (id) => {
  return adminApi.delete(`/admin/images/delete/${id}`);
};
