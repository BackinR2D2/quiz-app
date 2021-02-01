import React, { useState, useEffect, useRef } from 'react'
import Question from './Question';
import Stats from './Stats';

function Game({ questions, restart, setIsSubmitted, auth }) {
    let [idx, setIdx] = useState(0);
    const [time, setTime] = useState(10);
    const [playerAnswers, setPlayerAnswers] = useState([]);
    const [rightAnswer, setRightAnswer] = useState([]);
    const [finished, setFinished] = useState(false);
    const timer = useRef(0);
    useEffect(() => {
        timer.current = (
            setTimeout(() => {
                if (++idx < questions.results.length) {
                    setIdx(idx);
                } else {
                    setFinished(true);
                }
            }, 10000)
        );
    }, [questions.results.length, idx])

    const isClicked = () => {
        clearTimeout(timer.current);
        setIdx(idx + 1);
        setTime(10);
    }

    const userAnswers = (text, i) => {
        setPlayerAnswers([...playerAnswers, {
            userAnswer: text,
            index: i
        }]);
    }

    const isRight = (i, difficulty) => {
        setRightAnswer([...rightAnswer, {
            index: i,
            difficulty
        }])
    }

    return (
        <>
            {
                idx < questions.results.length && !finished ?
                    <Question data={questions.results[idx]} fullData={questions.results} key={idx} nr={idx} isClicked={isClicked} time={time} userAnswers={userAnswers} rightAnswers={isRight} />
                    :
                    <Stats data={questions.results} playerAnswers={playerAnswers} rightAnswers={rightAnswer} restart={restart} setIsSubmitted={setIsSubmitted} auth={auth} setIdx={setIdx} />
            }
        </>
    )
}

export default Game
