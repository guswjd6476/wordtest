// components/WordSelection.tsx
import React from 'react';

interface WordSelectionProps {
    currentPage: number;
    buttonStates: Record<string, boolean>;
    updateScore: (word: string) => void;
    setCurrentPage: (page: number) => void;
}

const WordSelection: React.FC<WordSelectionProps> = ({ currentPage, buttonStates, updateScore, setCurrentPage }) => {
    if (currentPage !== 1) return null;

    const words = [
        '고마워',
        '기분좋다',
        '덕분이야',
        '할 수 있어',
        '기대',
        '사랑',
        '잘될거야',
        '충분',
        '미룸',
        '짜증',
        '후회',
        '못하겠어',
        '이제그만해',
        '우울하다',
        '죽겠다',
        '지겹다',
        '최악이다',
        '그게아니라',
        '멋져',
        '잘했어',
        '불만',
        '실망',
    ];

    return (
        <div className="flex flex-col items-center p-8 bg-gradient-to-r from-teal-100 via-pink-100 to-yellow-100 ">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
                {words.map((word) => (
                    <button
                        key={word}
                        onClick={() => updateScore(word)}
                        className={`px-5 py-2.5 text-md font-medium rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                            buttonStates[word]
                                ? 'bg-pink-500 text-white shadow-lg'
                                : 'bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WordSelection;
