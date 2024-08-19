// components/FeedbackList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Feedback {
    id: number;
    name: string;
    contact: string;
    responsible_person: string;
    feedback: string;
}

const FeedbackList: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadFeedbacks = async () => {
            try {
                const response = await axios.get('/api/saveFeedback'); // 업데이트된 API 엔드포인트
                setFeedbacks(response.data);
            } catch (error) {
                setError('Failed to load feedback');
            } finally {
                setLoading(false);
            }
        };

        loadFeedbacks();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Feedback List</h1>
            <button
                onClick={() => router.push('/admin')}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Go to Admin Page
            </button>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border-b border-gray-300 text-left">이름</th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">연락처</th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">담당자</th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">내용</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr
                            key={feedback.id}
                            className="even:bg-gray-50"
                        >
                            <td className="px-4 py-2 border-b border-gray-300">{feedback.name}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{feedback.contact}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{feedback.responsible_person}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{feedback.feedback}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackList;
