import { useState } from 'react';

// 단어와 점수 상태의 타입을 정의합니다
type ButtonStates = Record<string, boolean>;

// 점수 등급에 따른 제안 사항
const suggestions: Record<string, string> = {
    상: '훌륭합니다! 긍정적인 말들이 주변에 많은 것 같네요. 앞으로도 계속 긍정적인 에너지를 주변과 나누세요!',
    중: '좋습니다! 긍정적인 말이 부족할 수 있습니다. 긍정적인 에너지를 주변에 좀 더 자주 표현해 보세요.',
    하: '노력해 볼 필요가 있습니다. 주변에서 긍정적인 말을 더 많이 들을 수 있도록 노력해 보세요. 긍정적인 환경을 만들기 위해 노력해 보세요.',
};

export default function Home() {
    const [score, setScore] = useState<number>(0);
    const [buttonStates, setButtonStates] = useState<ButtonStates>({});
    const [showResults, setShowResults] = useState<boolean>(false);

    const updateScore = (word: string) => {
        const positiveWords = [
            '고마워',
            '기분좋다',
            '덕분이야',
            '할 수 있어',
            '기대',
            '사랑',
            '잘될거야',
            '충분',
            '멋져', // 추가된 긍정적인 말
            '잘했어', // 추가된 긍정적인 말
        ];
        const negativeWords = [
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
            '불만', // 추가된 부정적인 말
            '실망', // 추가된 부정적인 말
        ];

        const isPositive = positiveWords.includes(word);
        const isNegative = negativeWords.includes(word);

        // 버튼 상태 업데이트
        setButtonStates((prevStates) => {
            const newState = !prevStates[word];
            if (newState) {
                // 클릭 시 점수 업데이트
                setScore((prevScore) => prevScore + (isPositive ? 1 : isNegative ? -1 : 0));
            } else {
                // 클릭 해제 시 점수 업데이트
                setScore((prevScore) => prevScore - (isPositive ? 1 : isNegative ? -1 : 0));
            }
            return { ...prevStates, [word]: newState };
        });
    };

    // 점수에 따른 등급과 제안 사항 결정
    const getSuggestion = (score: number) => {
        if (score >= 10) return suggestions['상'];
        if (score >= 0) return suggestions['중'];
        return suggestions['하'];
    };

    return (
        <div className="flex flex-col items-center p-8 font-sans">
            <h1 className="text-3xl font-bold mb-4">말씀광장 노원지부 단어 클릭 점수 게임</h1>

            {!showResults ? (
                <>
                    <div className="flex flex-wrap gap-4 mb-6">
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
                            '멋져', // 추가된 긍정적인 말
                            '잘했어', // 추가된 긍정적인 말
                            '불만', // 추가된 부정적인 말
                            '실망', // 추가된 부정적인 말
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
                    <button
                        onClick={() => setShowResults(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
                    >
                        확인
                    </button>
                </>
            ) : (
                <div className="mt-6 p-4 bg-gray-100 rounded shadow-lg max-w-md">
                    <h2 className="text-2xl font-semibold mb-2">점수 결과</h2>
                    <p className="text-xl mb-4">
                        현재 점수: <span className="font-bold">{score}</span>
                    </p>
                    <h3 className="text-xl font-semibold mb-2">점수 등급</h3>
                    <p className="mb-4">{score >= 10 ? '상' : score >= 0 ? '중' : '하'}</p>
                    <h3 className="text-xl font-semibold mb-2">제안 사항</h3>
                    <p>{getSuggestion(score)}</p>
                </div>
            )}
        </div>
    );
}
