import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, updateArticle } from "../api/articleService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: "",
        content: "",
        category: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await getArticleById(id);
                setArticle(res);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch article");
            }
        };
        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    // submit with button status
    const handleSubmit = async (status) => {
        setLoading(true);
        try {
            await updateArticle(id, { ...article, status });
            setErrors({});
            toast.success(`Article updated as ${status}!`);
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            console.error(err.response?.data?.validation_error);
            setErrors(err.response?.data?.validation_error || {});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-xl font-bold mb-4">Edit Article</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded p-2"
                        required
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded p-2"
                        rows={4}
                        required
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={article.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded p-2"
                        required
                    />
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div className="flex space-x-4 mt-4">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleSubmit("publish")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {loading ? "Updating..." : "Publish"}
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleSubmit("draft")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        {loading ? "Updating..." : "Save as Draft"}
                    </button>
                </div>
            </div>
        </div>
    );
}
