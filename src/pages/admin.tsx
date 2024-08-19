import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthProvider';

interface ItemWithExpireTime {
    value: string;
    expire: number;
}

const Admin: React.FC = () => {
    const { isLoggedIn, logout, login } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [newUsername, setNewUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [allowLogin, setAllowLogin] = useState<boolean>(true);
    const router = useRouter();

    const setItemWithExpireTime = (keyName: string, keyValue: string, tts: number) => {
        const expireTime = Date.now() + tts; // 토큰의 만료 시간 계산
        const obj: ItemWithExpireTime = {
            value: keyValue,
            expire: expireTime,
        };
        const objString = JSON.stringify(obj);
        window.localStorage.setItem(keyName, objString);
    };

    const handleSubmitLogin = async () => {
        try {
            const response = await axios.post('/api/adminLogin', { username, password });
            const { token, grade } = response.data; // Extract token from response
            console.log(token, '?token');
            if (token && grade === 1) {
                // Store token and its expiry time in localStorage
                const TOKEN_EXPIRY_TIME = 3600 * 1000; // 토큰의 만료 시간: 1시간 (단위: 밀리초)
                setItemWithExpireTime('token', token, TOKEN_EXPIRY_TIME);

                alert('로그인 되었습니다');
                login(); // 로그인 상태로 설정
                // Redirect to Admin page
                router.push('/admin');
            } else if (token && grade !== 1) {
                alert('인증받지 못한 아이디 입니다');
            } else {
                alert('아이디 비밀번호를 확인해주세요');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            alert('아이디 비밀번호를 확인해주세요');
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/addAdmin', {
                username: newUsername,
                password: newPassword,
                name: name,
            });
            if (response.data === true) {
                const result = response.data;
                console.log(result);
                alert('가입되었습니다');
                setAllowLogin(true);
            } else {
                alert('가입된 아이디 입니다');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            // Handle errors
        }
    };
    return (
        <div className="max-w-md mx-auto">
            {!isLoggedIn ? (
                <>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700"
                        >
                            아이디
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={allowLogin ? username : newUsername}
                            onChange={(e) =>
                                allowLogin ? setUsername(e.target.value) : setNewUsername(e.target.value)
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={allowLogin ? password : newPassword}
                            onChange={(e) =>
                                allowLogin ? setPassword(e.target.value) : setNewPassword(e.target.value)
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                        />
                    </div>
                    {allowLogin ? (
                        <></>
                    ) : (
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700"
                            >
                                이름
                            </label>
                            <input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                            />
                        </div>
                    )}
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => {
                                allowLogin ? handleSubmitLogin() : handleSubmit();
                            }}
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            {allowLogin ? '로그인' : '가입하기'}
                        </button>
                        {allowLogin ? (
                            <button
                                onClick={() => setAllowLogin(false)}
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                회원가입
                            </button>
                        ) : null}
                    </div>
                </>
            ) : (
                <>
                    {/* 출석 현황 보기 및 Qrcode 페이지로 이동 버튼 */}
                    <div className="mt-6 w-full flex justify-between">
                        <button
                            onClick={() => router.push('/adminaddlist')}
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            결과보기
                        </button>

                        <button
                            onClick={() => {
                                logout();
                                router.push('/');
                            }}
                        >
                            로그아웃
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Admin;
