import axios from "axios";

const API_URL = "http://localhost:8080/article";

export const getArticles = async (status, limit = 10, offset = 0) => {
    const res = await axios.get(`${API_URL}?limit=${limit}&offset=${offset}`);
    console.log("Response dari backend:", res.data);

    return Array.isArray(res.data) ? res.data.filter(item => (item.status || "").toLowerCase() === (status || "").toLowerCase()) : [];
};

export const getArticleById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

export const createArticle = async (data) => {
    return axios.post(API_URL, data);
};

export const updateArticle = async (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
};

export const deleteArticle = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};