import React, { useEffect, useState } from "react";
import ArticleTable from "../components/ArticleTable";
import {
    getArticles,
    getArticleById,
    updateArticle as apiUpdateArticle,
} from "../api/articleService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  { key: "publish", label: "Published" },
  { key: "draft", label: "Drafts" },
  { key: "thrash", label: "Trashed" },
];

export default function AllPosts() {
    const [activeTab, setActiveTab] = useState("publish");
    const [articles, setArticles] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trashId, setTrashId] = useState(null);
    const [showTrashModal, setShowTrashModal] = useState(false);

    const fetchList = async (tab = activeTab, lim = limit, pg = page) => {
        setLoading(true);
        setError(null);
        const offset = (pg - 1) * lim;
        try {
            const res = await getArticles(tab, lim, offset);
            setArticles(res.articles ?? res);
            setTotal(res.total ?? (res.length < lim ? (pg - 1) * lim + res.length : pg * lim + 1));
        } catch (err) {
            console.error(err);
            setError("Failed to get article data");
            setArticles([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        fetchList(activeTab, limit, 1);
    }, [activeTab]);

    useEffect(() => {
        fetchList(activeTab, limit, page);
    }, [limit, page]);

    const handleTrash = (id) => {
        setTrashId(id);
        setShowTrashModal(true);
    };

    const confirmTrash = async () => {
        if (!trashId) return;
        setLoading(true);
        try {
            const article = await getArticleById(trashId);
            const payload = {
                title: article.title,
                content: article.content,
                category: article.category,
                status: "thrash",
            };
            await apiUpdateArticle(trashId, payload);
            toast.success("Article moved to Trash!");
            fetchList(activeTab, limit, page); // use page & limit
        } catch (err) {
            console.error(err);
            toast.error("Failed to move article to Trash");
        } finally {
            setTrashId(null);
            setShowTrashModal(false);
            setLoading(false);
        }
    };

    const cancelTrash = () => {
        setTrashId(null);
        setShowTrashModal(false);
    };

    const prevPage = () => {
        if (page > 1) setPage(prev => prev - 1);
    };
    const nextPage = () => {
        const totalPages = Math.ceil(total / limit);
        if (page < totalPages) setPage(prev => prev + 1);
    };
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-2xl font-semibold mb-4">All Posts</h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`px-4 py-2 rounded ${
                        activeTab === t.key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Limit:</label>
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border rounded px-2 py-1"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                <div className="text-sm text-gray-600">
                    {loading ? "Loading..." : `${total} item(s)`}
                </div>
            </div>

            {/* Table */}
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
            )}

            <ArticleTable articles={articles} onTrash={handleTrash} />

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                    Previous
                </button>

                <div className="text-sm">
                    Page {page} of {totalPages || 1}
                </div>

                <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Trash Modal */}
            {showTrashModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded shadow p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Trash</h2>
                        <p>Are you sure you want to move this article to Trash?</p>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={cancelTrash}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmTrash}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
