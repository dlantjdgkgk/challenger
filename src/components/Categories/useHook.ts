import React from 'react';
import { useRouter } from 'next/router';
import { useCacheApi } from 'react-cache-api';
import { useCookies } from 'react-cookie';

const useCategories = () => {
    const router = useRouter();
    const currentCategory = router.query.value;
    const [cookies, setCookies] = useCookies([]);
    console.log(cookies.token);

    //게시글 전체조회 API
    const { data, error, isValidation } = useCacheApi(`/documents`, {
        offset: 0,
        limit: 21,
        category: currentCategory,
    });
    return { data };
};

export default useCategories;
