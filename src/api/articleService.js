import axios from "axios";

const API_URL = "http://localhost:8080/article";

export const getArticles = async (status = "publish", limit = 10, offset = 0) => {
    try {
        // send to BE
        const res = await axios.get(API_URL, {
            params: { limit, offset, status }
        });

        // res.data = { data: [...], total: X, limit: Y, offset: Z }
        const articles = Array.isArray(res.data.data) ? res.data.data : [];
        const total = res.data.total || 0;

        console.log("Response from backend:", res.data);

        return { articles, total };
    } catch (err) {
        console.error("Failed to fetch articles:", err);
        return { articles: [], total: 0 };
    }
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