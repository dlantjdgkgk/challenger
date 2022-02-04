import axios from 'axios';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { Form } from '../style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = ({ value, onClick }) => (
        <button className='example-custom-input' onClick={onClick}>
            {value}
        </button>
    );
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
        />
    );
};

export default DatePickerComponent;
