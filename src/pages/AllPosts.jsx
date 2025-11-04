import React, { useEffect, useState } from "react";
import ArticleTable from "../components/ArticleTable";
import {
    getArticles,
    getArticleById,
    updateArticle as apiUpdateArticle,
} from "../api/articleService";

const TABS = [
  { key: "publish", label: "Published" },
  { key: "draft", label: "Drafts" },
  { key: "thrash", label: "Trashed" },
];

export default function AllPosts() {
    const [activeTab, setActiveTab] = useState("publish");
    const [articles, setArticles] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalFetched, setTotalFetched] = useState(0); // number of items returned this fetch
    const [error, setError] = useState(null);

    const fetchList = async (tab = activeTab, lim = limit, off = offset) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getArticles(tab, lim, off);
            setArticles(data);
            setTotalFetched(data.length);
        } catch (err) {
            console.error(err);
            setError("Failed to get article data");
            setArticles([]);
            setTotalFetched(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // reset pagination when tab changes
        setOffset(0);
        fetchList(activeTab, limit, 0);
        // eslint-disable-next-line
    }, [activeTab]);

    useEffect(() => {
        fetchList(activeTab, limit, offset);
        // eslint-disable-next-line
    }, [limit, offset]);

    const handleTrash = async (id) => {
        console.log("id handle trash:",id);
        if (!confirm("Move this article to Trash?")) return;
            setLoading(true);
        try {
            // fetch full article
            const article = await getArticleById(id);
            // update status -> thrash
            const payload = {
                title: article.title,
                content: article.content,
                category: article.category,
                status: "thrash",
            };
            await apiUpdateArticle(id, payload);
            // refresh list
            fetchList(activeTab, limit, offset);
            // if trashed, also refresh other tabs optionally
        } catch (err) {
            console.error(err);
            alert("Failed move article to trash");
        } finally {
            setLoading(false);
        }
    };

    const prevPage = () => {
        if (offset - limit >= 0) setOffset(offset - limit);
    };
    const nextPage = () => {
        // if fetched less than limit, likely no more; still allow next to try
        setOffset(offset + limit);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
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
                            setOffset(0);
                        }}
                        className="border rounded px-2 py-1"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                <div className="text-sm text-gray-600">
                    {loading ? "Loading..." : `${totalFetched} item(s)`}
                </div>
            </div>

            {/* Table */}
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <ArticleTable articles={articles} onTrash={handleTrash} />

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={prevPage}
                    disabled={offset === 0}
                    className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                    Previous
                </button>

                <div className="text-sm">
                    Page: {Math.floor(offset / limit) + 1}
                </div>

                <button
                    onClick={nextPage}
                    className="px-4 py-2 rounded bg-gray-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
