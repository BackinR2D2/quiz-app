import React, { useState, useEffect } from 'react'
import Timer from './static/Timer';
import Icon from '@mdi/react';
import { mdiTimerOutline } from '@mdi/js';
import he from 'he';

function Question({ data, fullData, nr, isClicked, time, userAnswers, rightAnswers }) {
    const [answers, setAnswers] = useState([]);

    const shuffle = (arr) => {
        let ctr = arr.length, temp, index;
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = arr[ctr];
            arr[ctr] = arr[index];
            arr[index] = temp;
        }
        return arr;
    }

    const handleAnswer = (e) => {
        if (e.target.innerText === he.decode(data.correct_answer)) {
            rightAnswers(nr, fullData[nr].difficulty);
        }
        userAnswers(e.target.innerText, nr);
        isClicked();
    }

    useEffect(() => {
        setAnswers(shuffle([...data.incorrect_answers, data.correct_answer]));
    }, [data.correct_answer, data.incorrect_answers])
    return (
        <div className="container">
            {
                <>
                    <div className="timer">
                        <h5 className="tleft">TIME LEFT</h5>
                        <div className="cr">
                            <Icon path={mdiTimerOutline}
                                size={'20px'}
                                color="red"
                            />
                            <Timer time={time} />
                        </div>
                    </div>
                    <div className="questionNumber">
                        <small className="number">QUESTION {nr + 1} / 10</small>
                    </div>
                    <div className="question">
                        <h5 className="hquestion" dangerouslySetInnerHTML={{ __html: data.question }} />
                    </div>
                    <div className="questions">
                        {answers.map((a, i) => (
                            <div key={i} className="question">
                                <button dangerouslySetInnerHTML={{ __html: a }} onClick={handleAnswer} className="btn btn-light answerBtn" />
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default Question
