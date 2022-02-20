import { Popular } from '../style';
import Link from 'next/link';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCategories from './useHook';
// get 에서만 useCacheApi 사용 가능

const Categories = () => {
    const { data } = useCategories();
    const isError = data?.error === true;
    const b = [data];
    console.log([data]?.[0]?.message);

    return (
        <>
            {isError ? (
                alert(`${b?.[0]?.message}`)
            ) : (
                <Popular>
                    {data?.map((a) => {
                        return (
                            <div className='image'>
                                <Link href={`/detail?value=${a?.documentId}`}>
                                    <img
                                        src={`${a?.img}`}
                                        width='500px'
                                        height='300px'
                                        className='popular'
                                    />
                                </Link>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        size='2x'
                                    />
                                    <span style={{ padding: '10px' }}>
                                        공식 챌린지
                                    </span>
                                    <br />
                                    <p>{a?.title}</p>
                                    <p>{a?.remaining_days}일 후부터 시작</p>
                                    <span className='text'>매일</span>
                                    <span className='text_box'>
                                        {a?.term / 7}주동안
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </Popular>
            )}
        </>
    );
};

export default Categories;
