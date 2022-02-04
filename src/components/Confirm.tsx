import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';

const Confirm = () => {
    const a = 5;
    const b = 7;
    return (
        <>
            <img src='/2.png' width='1000' height='500'></img>
            <div>
                <p>공식 챌린지</p>
                <p>공식 챌린지</p>
                <p>공식 챌린지</p>
                {!a ? (
                    <button>참여하기</button>
                ) : (
                    <div>
                        <button>수정하기</button>
                        <button>삭제하기</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Confirm;
