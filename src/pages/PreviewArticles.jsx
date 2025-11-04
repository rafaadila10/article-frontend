import { useState, useEffect } from "react";
import { getArticles } from "../api/articleService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PreviewArticles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(5); // amount articles per page
    const [total, setTotal] = useState(0);

    const fetchArticles = async (page) => {
        setLoading(true);
        const offset = (page - 1) * limit;
        try {
            const res = await getArticles("publish", limit, offset);
            setArticles(res.articles);
            setTotal(res.total);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch articles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(page);
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    const handleNext = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };
    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-2xl font-bold mb-6">Preview Blog Articles</h2>

            {loading ? (
                <p>Loading...</p>
            ) : articles.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                articles.map((article) => (
                    <div key={article.id} className="mb-8 border-b pb-4">
                        <h3 className="text-xl font-semibold">{article.title}</h3>
                        <p className="text-gray-500 text-sm mb-2">Category: {article.category}</p>
                        <p>{article.content}</p>
                    </div>
                ))
            )}

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrev}
                    disabled={page === 1 || loading}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                    Page {page} of {totalPages || 1}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages || loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
