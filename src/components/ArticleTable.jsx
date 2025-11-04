import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ArticleTable({ articles, onTrash }) {
    const navigate = useNavigate();

    return (
        <div className="overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {articles.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                No articles found.
                            </td>
                        </tr>
                    ) : (
                        articles.map((a, idx) => (
                        <tr key={a.id ?? idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            <button
                                onClick={() => navigate(`/edit/${a.id}`)}
                                className="inline-flex items-center px-2 py-1 mr-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                                title="Edit"
                            >
                                <Edit3 size={16} />
                            </button>

                            <button
                                onClick={() => onTrash(a.id)}
                                className="inline-flex items-center px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800"
                                title="Move to Trash"
                            >
                                <Trash2 size={16} />
                            </button>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}