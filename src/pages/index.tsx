import { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import ScoreResult from './components/ScoreResult';
import WordSelection from './components/WordSelection';

export default function Home() {
    const [score, setScore] = useState<number>(0);
    const [buttonStates, setButtonStates] = useState<Record<string, boolean>>({});
    const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page
    const [negativeWords, setNegativeWords] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Track selected option
    const [animationStage, setAnimationStage] = useState<'initial' | 'filling' | 'fading' | 'faded'>('initial'); // Track animation stage
    const [wordsVisible, setWordsVisible] = useState<boolean>(true); // Track visibility of words

    const suggestions: Record<string, string> = {
        상: '훌륭합니다! 긍정적인 말들이 주변에 많은 것 같네요. 앞으로도 계속 긍정적인 에너지를 주변과 나누세요!',
        중: '좋습니다! 긍정적인 말이 부족할 수 있습니다. 긍정적인 에너지를 주변에 좀 더 자주 표현해 보세요.',
        하: '노력해 볼 필요가 있습니다. 주변에서 긍정적인 말을 더 많이 들을 수 있도록 노력해 보세요. 긍정적인 환경을 만들기 위해 노력해 보세요.',
    };

    const getSuggestion = (score: number) => {
        if (score >= 10) return suggestions['상'];
        if (score >= 0) return suggestions['중'];
        return suggestions['하'];
    };

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
            '멋져',
            '잘했어',
        ];
        const negativeWordsList = [
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
            '불만',
            '실망',
        ];

        const isPositive = positiveWords.includes(word);
        const isNegative = negativeWordsList.includes(word);

        setButtonStates((prevStates) => {
            const newState = !prevStates[word];
            if (newState) {
                setScore((prevScore) => prevScore + (isPositive ? 1 : isNegative ? -1 : 0));
                if (isNegative) {
                    setNegativeWords((prevWords) => {
                        if (!prevWords.includes(word)) {
                            return [...prevWords, word];
                        }
                        return prevWords;
                    });
                }
            } else {
                setScore((prevScore) => prevScore - (isPositive ? 1 : isNegative ? -1 : 0));
                if (isNegative) {
                    setNegativeWords((prevWords) => prevWords.filter((w) => w !== word));
                }
            }
            return { ...prevStates, [word]: newState };
        });
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        if (option === '3') {
            setAnimationStage('filling');
        }
    };

    useEffect(() => {
        if (animationStage === 'initial' && selectedOption === '3') {
            const fillTimer = setTimeout(() => {
                setAnimationStage('filling');
            }, 5000); // Duration to fill the clean water
            return () => clearTimeout(fillTimer);
        }

        if (animationStage === 'filling') {
            const fillTimer = setTimeout(() => {
                setAnimationStage('fading');
            }, 3000); // Duration to fill the clean water
            return () => clearTimeout(fillTimer);
        }

        if (animationStage === 'fading') {
            const fadeTimer = setTimeout(() => {
                setWordsVisible(false); // Hide dirty words
                setAnimationStage('initial'); // Reset animation stage
            }, 5000); // Duration for dirty words to fade out
            return () => clearTimeout(fadeTimer);
        }
    }, [animationStage, selectedOption]);

    const goToNextPage = () => {
        if (currentPage < 7) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex flex-col items-center p-8 font-sans">
            {currentPage === 1 && <h1 className="text-3xl font-bold mb-4">말씀광장 노원지부 단어 클릭 점수 게임</h1>}
            {currentPage === 1 && (
                <WordSelection
                    currentPage={currentPage}
                    buttonStates={buttonStates}
                    updateScore={updateScore}
                    setCurrentPage={setCurrentPage}
                />
            )}

            {currentPage === 2 && (
                <ScoreResult
                    currentPage={currentPage}
                    score={score}
                    getSuggestion={getSuggestion}
                />
            )}
            {currentPage === 3 && (
                <div className="flex flex-col items-center mt-6 p-4 bg-gray-100 rounded shadow-lg max-w-md">
                    <h2 className="text-2xl font-semibold mb-2">워드스퀘어(말씀광장)에서 제공하는 양질의 콘텐츠</h2>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <img
                            src="https://ifh.cc/g/vtFC9T.jpg"
                            alt="콘텐츠 1"
                            className="w-full max-w-xs rounded shadow-lg"
                        />
                        <img
                            src="https://ifh.cc/g/f1wqlK.jpg"
                            alt="콘텐츠 2"
                            className="w-full max-w-xs rounded shadow-lg"
                        />
                        <img
                            src="https://ifh.cc/g/dTJqFj.jpg"
                            alt="콘텐츠 3"
                            className="w-full max-w-xs rounded shadow-lg"
                        />
                        <img
                            src="https://ifh.cc/g/7ZNtX5.jpg"
                            alt="콘텐츠 4"
                            className="w-full max-w-xs rounded shadow-lg"
                        />
                        <img
                            src="https://ifh.cc/g/vgYSar.jpg"
                            alt="콘텐츠 5"
                            className="w-full max-w-xs rounded shadow-lg"
                        />
                        <img
                            src="https://ifh.cc/g/pa1SOM.jpg"
                            alt="콘텐츠 6"
                            className="w-full max-w-xs rounded shadow-lg"
                        />
                    </div>
                </div>
            )}

            {currentPage === 4 && (
                <div className="flex flex-col items-center mt-6 p-4 bg-gray-100 rounded shadow-lg max-w-md">
                    <h2 className="text-2xl font-semibold mb-2">지저분한 그릇</h2>
                    <div className="relative flex justify-center items-end bg-gray-200 rounded-b-full w-64 h-64 overflow-hidden mb-6">
                        {/* Dirty Water */}
                        <div
                            className={`absolute bottom-0 w-full h-40 ${
                                animationStage === 'initial' || animationStage === 'filling'
                                    ? 'bg-yellow-900 opacity-100'
                                    : 'bg-yellow-900 opacity-0'
                            } z-10 blur-sm transition-opacity duration-1000`}
                        ></div>
                        {/* Clean Water */}
                        <div
                            className={`absolute bottom-0 w-full h-full bg-blue-300 ${
                                animationStage !== 'initial' ? 'opacity-100' : 'opacity-0'
                            } z-20 transition-opacity duration-[3000ms]`}
                        ></div>
                        <div className={`flex h-40 items-center duration-300`}>
                            {negativeWords.map((word, index) => (
                                <p
                                    key={index}
                                    className={`z-30 text-white text-lg font-bold transition-opacity duration-500 ${
                                        animationStage === 'initial'
                                            ? 'opacity-100'
                                            : animationStage === 'filling'
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }`}
                                >
                                    {word}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">질문</h2>
                        <p className="text-lg mb-4">
                            당신이 적었던 -1점이 된 말들이 담긴 그릇 안에 지저분한 물이 있습니다. 이 물을 깨끗하게
                            하려면 어떻게 해야 할까요?
                        </p>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => alert('부정적인 것에 집중하다보면 긍정적인 것에 집중할 수 없습니다')}
                                className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                            >
                                1. 하나하나 지저분한 것을 빼낸다
                            </button>
                            <button
                                onClick={() => alert('계속 두게 되면 고여버려 썩게 될 수도 있습니다')}
                                className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                            >
                                2. 그냥 둔다
                            </button>
                            <button
                                onClick={() => handleOptionSelect('3')}
                                className={`px-4 py-2 rounded shadow-lg transition duration-300 ease-in-out ${
                                    selectedOption === '3'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            >
                                3. 깨끗한 물을 계속 붓는다
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {currentPage === 5 && (
                <div className="flex flex-col items-center mt-6 p-4 bg-gray-100 rounded shadow-lg max-w-md">
                    <img
                        src="https://ifh.cc/g/2RLlys.jpg"
                        className="w-full max-w-xs rounded shadow-lg mb-4"
                    />
                </div>
            )}
            {currentPage === 6 && (
                <div className="flex flex-col items-center mt-6 p-4 bg-gray-100 rounded shadow-lg max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">워드스퀘어(말씀광장)에서 제공하는 양질의 콘텐츠</h2>
                    <img
                        src="https://ifh.cc/g/NLDC0J.jpg"
                        alt="성경의 우수성"
                        className="w-full max-w-xs rounded shadow-lg mb-4"
                    />
                    <img
                        src="https://ifh.cc/g/j3Z4Lh.jpg"
                        alt="워드스퀘어 콘텐츠"
                        className="w-full max-w-xs rounded shadow-lg mb-4"
                    />

                    <p className="text-lg">
                        워드스퀘어(말씀광장)에서도 좋은 양질의 콘텐츠를 이와 같이 제공하고 있습니다.
                    </p>
                </div>
            )}
            {currentPage === 7 && <FeedbackForm />}
            <div className="flex justify-between w-full mt-6">
                {currentPage > 1 && (
                    <button
                        onClick={goToPreviousPage}
                        className="px-4 py-2 bg-gray-500 text-white rounded shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
                    >
                        이전
                    </button>
                )}
                {currentPage < 7 && (
                    <button
                        onClick={goToNextPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        다음
                    </button>
                )}
            </div>
        </div>
    );
}
