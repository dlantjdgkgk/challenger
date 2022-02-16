import { Submit } from '../style';
import Select from 'react-select';
import Deadline from '../Deadline';
import Link from 'next/link';
import useWrite from './useHook';

const Write = () => {
    const {
        handleSubmit,
        title,
        handleTitle,
        category_data,
        category,
        handleCategory,
        category_Options,
        participant,
        handleParticipant,
        participant_option,
        cost,
        handleCost,
    } = useWrite();
    return (
        <>
            <Submit method='post' action='/' onSubmit={handleSubmit}>
                <Link href='/'>
                    <img
                        src='/create.PNG'
                        width='200'
                        height='200'
                        alt='My Image'
                        className='title'
                    ></img>
                </Link>

                <h1>챌린지 글 작성하기</h1>
                <div>
                    <div>
                        <span>제목</span>
                        <input
                            id='title'
                            type='text'
                            value={title}
                            onChange={handleTitle}
                        />
                    </div>
                    <div>
                        <span>항목</span>
                        {category_data ? (
                            <Select
                                value={category}
                                onChange={handleCategory}
                                options={category_Options}
                            />
                        ) : null}
                    </div>
                    <div>
                        <span>인원</span>
                        <Select
                            value={participant}
                            onChange={handleParticipant}
                            options={participant_option}
                        />
                    </div>
                    <div>
                        <span>비용</span>
                        <input
                            id='cost'
                            type='text'
                            value={cost}
                            onChange={handleCost}
                        />
                    </div>
                    <Deadline />
                    <div>
                        <br></br>
                        <span className='upload'>업로드</span>
                        <input
                            type='file'
                            className='imgInput'
                            accept='image/*'
                            name='img'
                        />
                    </div>
                </div>

                <button className='submit'>제출하기</button>
            </Submit>
        </>
    );
};

export default Write;
