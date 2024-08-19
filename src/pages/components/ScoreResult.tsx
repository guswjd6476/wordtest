import React from 'react';

interface ScoreResultProps {
    currentPage: number;
    score: number;
    getSuggestion: (score: number) => string;
}

const ScoreResult: React.FC<ScoreResultProps> = ({ currentPage, score, getSuggestion }) => {
    if (currentPage !== 2) return null;

    const grade = score >= 10 ? '상' : score >= 0 ? '중' : '하';

    return (
        <div className="mt-6 p-6 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-lg shadow-xl max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">점수 결과</h2>
            <p className="text-xl text-gray-700 mb-4 text-center">
                현재 점수: <span className="font-bold text-green-600">{score}</span>
            </p>
            <div className="mb-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">점수 등급</h3>
                <p
                    className={`text-lg font-medium ${
                        grade === '상' ? 'text-green-600' : grade === '중' ? 'text-blue-600' : 'text-red-600'
                    }`}
                >
                    {grade}
                </p>
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">제안 사항</h3>
                <p className="text-gray-700">{getSuggestion(score)}</p>
            </div>
        </div>
    );
};

export default ScoreResult;
