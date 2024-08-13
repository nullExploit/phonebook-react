import { api } from "../../api";

export const load = (sort, keyword, limit) =>
  api.get("api/phonebooks", {
    params: {
      sort: sort ? (sort === true ? "desc" : "asc") : "asc",
      keyword,
      limit,
    },
  });

export const add = (name, phone) =>
  api.post("api/phonebooks", {
    name,
    phone,
  });

export const remove = (id) => api.delete(`api/phonebooks/${id}`);

export const update = (id, name, phone) =>
  api.put(`api/phonebooks/${id}`, {
    name,
    phone,
  });

export const updateAvatar = (id, formData) =>
  api.put(`api/phonebooks/${id}/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
