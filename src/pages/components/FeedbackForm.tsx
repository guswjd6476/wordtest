import { useState } from 'react';
import axios from 'axios';

export default function FeedbackForm() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/saveFeedback', {
                name,
                contact,
                responsiblePerson,
                feedback,
            });

            if (response.status === 200 && response.data.success) {
                alert('피드백이 성공적으로 저장되었습니다!');
                // Clear the form
                setName('');
                setContact('');
                setResponsiblePerson('');
                setFeedback('');
            } else {
                alert('피드백 저장에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

    return (
        <div className="flex flex-col items-center mt-6 p-4 bg-gray-100 rounded shadow-lg max-w-md">
            <p className="mb-4">
                워드스퀘어(말씀광장) 의 크루가 되어 주세요! 다양한 네트워크를 통해 자신을 발전시켜 보세요
            </p>
            <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="이름"
                    className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="연락처"
                    className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="담당자명"
                    className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={responsiblePerson}
                    onChange={(e) => setResponsiblePerson(e.target.value)}
                    required
                />
                <textarea
                    placeholder="피드백을 남겨주세요"
                    className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    제출
                </button>
            </form>
        </div>
    );
}
