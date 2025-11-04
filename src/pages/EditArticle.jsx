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
        status: "",
    });
    const [errors, setErrors] = useState({}); // <-- state error per field
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
        setErrors(prev => ({ ...prev, [name]: "" })); // reset error saat user edit
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateArticle(id, article);
            setErrors({});
            toast.success("Article updated!");
            navigate("/"); // balik ke list
        } catch (err) {
            console.error(err.response?.data?.validation_error);
            setErrors(err.response?.data?.validation_error || {}); // <-- set error per field
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Edit Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={article.status}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded p-2"
                    >
                        <option value="">Select status</option>
                        <option value="publish">Publish</option>
                        <option value="draft">Draft</option>
                        <option value="trash">Trash</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Updating..." : "Update Article"}
                </button>
            </form>
        </div>
    );
}
