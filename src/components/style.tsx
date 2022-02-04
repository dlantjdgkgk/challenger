import styled from 'styled-Components';
import { DatePicker } from 'react-datepicker';

export const Form = styled.form`
    height: 98vh;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
        margin-top: -50px;
    }
    h3 {
        margin-bottom: 30px;
    }
    input {
        width: 500px;
        height: 30px;
        padding: 20px;
    }
    button {
        margin-top: 30px;
        width: 540px;
        height: 50px;
        border: 0;
        outline: none;
        background-color: #df1a61;
        color: white;
        font-size: 20px;
        font-weight: 1000;
    }
    ul {
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    li {
        list-style: none;
        color: black;
        font-weight: 700;
        padding: 12px;
    }
`;

export const Start = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const DIV = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    li {
        list-style: none;
        color: black;
        font-weight: 700;
        padding: 12px;
    }
`;

export const Container = styled.div`
    width: 1000px;
    margin: auto;
    height: 800px;
    overflow: hidden;
`;
export const Text = styled.div`
    text-align: center;
    color: burlywood;
    p {
        color: #fff;
        font-size: 20px;
        background-color: burlywood;
        display: inline-block;
        border-radius: 50px;
        padding: 0.5em 1em;
        margin-left: 900px;
    }
`;
export const SliderContainer = styled.div`
    margin: 0 auto;
    margin-bottom: 2em;
    display: flex;
    .capture {
        margin-top: 50px;
    }
`;
export const Button = styled.div`
    all: unset;
    padding: 1em 2em;
    margin: 2em 2em;
    color: burlywood;
    border-radius: 10px;
    border: 1px solid burlywood;
    cursor: pointer;
    &:hover {
        background-color: burlywood;
        color: #fff;
    }
`;
export const Center = styled.div`
    text-align: center;
`;

export const Popular = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    hr {
        width: 70%;
        border: 3px solid gray;
    }
    .text {
        padding: 5px;
        text-align: left;
        color: black;
        background-color: gray;
    }
    .text_box {
        margin-left: 15px;
        padding: 5px;
        text-align: left;
        color: black;
        background-color: gray;
    }
    .popular {
        border-radius: 7px;
        margin-right: 10px;
    }
`;

export const Category = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .category {
        border-radius: 7px;
        margin-right: 10px;
    }
    .category:nth-last-child(1) {
        margin: 50px;
    }
`;

export const Submit = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    #title {
        width: 392px;
        height: 30px;
        margin: 0 0 19.5px 17.5px;
        border: solid 3px #707070;
    }
    #category {
        width: 292px;
        height: 30px;
        margin: 0 0 19.5px 17.5px;
        border: solid 3px #707070;
    }
    #participant {
        width: 50px;
        height: 30px;
        margin: 0 0 19.5px 17.5px;
        border: solid 3px #707070;
    }
    #cost {
        width: 100px;
        height: 30px;
        margin: 0 0 19.5px 17.5px;
        border: solid 3px #707070;
    }

    #deadline {
        margin-right: 20px;
    }
    #end,
    #start {
        margin: 10px;
    }
    .start {
        display: flex;
        flex-direction: column;
    }
    .upload {
        margin-right: 30px;
    }
    .submit {
        width: 159px;
        height: 50px;
        margin: 70.5px 48px 0 52.5px;
        padding: 12px 31px 11px 32px;
        border-radius: 25px;
        box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.16);
        color: white;
        border: solid 1px #707070;
        background-color: #232426;
    }
`;
