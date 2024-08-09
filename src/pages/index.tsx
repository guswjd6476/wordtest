import { useState } from 'react';

export default function Home() {
    const [score, setScore] = useState(0);
    const [buttonStates, setButtonStates] = useState({});

    const updateScore = (word) => {
        const positiveWords = ['고마워', '기분좋다', '덕분이야', '할 수 있어', '기대', '사랑', '잘될거야', '충분'];
        const isPositive = positiveWords.includes(word);

        // 버튼 상태 업데이트
        setButtonStates((prevStates) => {
            const newState = !prevStates[word];
            if (newState) {
                // 클릭 시 점수 업데이트
                setScore((prevScore) => prevScore + (isPositive ? 1 : -1));
            } else {
                // 클릭 해제 시 점수 업데이트
                setScore((prevScore) => prevScore - (isPositive ? 1 : -1));
            }
            return { ...prevStates, [word]: newState };
        });
    };

    return (
        <div className="flex flex-col items-center p-8 font-sans">
            <h1 className="text-3xl font-bold mb-4">말씀광장 노원지부 단어 클릭 점수 게임</h1>
            <p className="text-xl mb-6">
                현재 점수: <span className="font-bold">{score}</span>
            </p>
            <div className="flex flex-wrap gap-4">
                {[
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
                ].map((word) => (
                    <button
                        key={word}
                        onClick={() => updateScore(word)}
                        className={`px-4 py-2 text-lg rounded transition duration-300 ease-in-out ${
                            buttonStates[word] ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
    );
}
