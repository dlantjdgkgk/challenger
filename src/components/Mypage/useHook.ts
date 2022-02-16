import { useCookies } from 'react-cookie';
import { useCacheApi } from 'react-cache-api';
import jwt from 'jsonwebtoken';

const useMypage = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const Logout = async () => {
        await removeCookie('token');
        console.log(cookies);
    };
    const token = cookies?.token?.split(' ')[1];
    const id = jwt.decode(token);
    const userId = id?.id;
    console.log(userId);

    const {
        data: userWrite,
        error,
        isValidation,
    } = useCacheApi(`/users/${userId}`);
    console.log(userWrite);

    const {
        data: userParticipant,
        error: error2,
        isValidation: inValidation2,
    } = useCacheApi(`/participants/`, {
        userId: userId,
    });
    console.log(userParticipant);
    return { Logout, userWrite, userParticipant };
};

export default useMypage;
