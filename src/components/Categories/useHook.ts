import React from 'react';
import { useRouter } from 'next/router';
import { useCacheApi } from 'react-cache-api';

const useCategories = () => {
    const router = useRouter();
    const currentCategory = router.query.value;
    // const config = {
    //     headers: {
    //     Authorization: `Bearer ${this.token}`
    //     }

    const { data, error, isValidation } = useCacheApi(`/documents`, {
        offset: 0,
        limit: 21,
        category: currentCategory,
    });
    return { data };
};

// useEffect(() => {
//     const categoryAPI = async () => {
//         const currentCategory = router.query.value;
//         const category = await axios.get(
//             `https://api.digital-hamster.net/documents?offset=${offset}&limit=${limit}&category=${currentCategory}`
//         );
//         setResult(category); // NULL
//     };
//     categoryAPI();
// }, []);

export default useCategories;
