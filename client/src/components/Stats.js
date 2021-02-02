import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import he from 'he';
import Swal from 'sweetalert2';
import config from './static/config';

function Stats({ data, playerAnswers, rightAnswers, auth, restart }) {
    const history = useHistory();
    const [isSent, setIsSent] = useState(false);
    const [score, setScore] = useState(0);
    const [isCalculated, setIsCalculated] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const answers = new Array(10);

    answers.fill({
        userAnswer: 'not provided',
    })
    answers.forEach((_, i) => {
        if (playerAnswers[i] !== undefined) {
            answers[playerAnswers[i].index] = {
                userAnswer: playerAnswers[i].userAnswer,
            }
        }
    })
    useEffect(() => {
        rightAnswers.forEach((el) => {
            if (el.difficulty === 'easy') {
                setScore(s => s + 5);
            }
            if (el.difficulty === 'medium') {
                setScore(s => s + 10);
            }
            if (el.difficulty === 'hard') {
                setScore(s => s + 15);
            }
        })
        setIsCalculated(true);
    }, [rightAnswers])

    useEffect(() => {
        const sendData = async () => {
            try {
                if (!isSent && auth && isCalculated) {
                    const sendAnswers = await axios.put(`${config.url}/update-score`, { score, rightAnswers }, {
                        headers: {
                            'Authorization': 'Bearer ' + auth,
                        }
                    })
                    setIsSent(true);
                }
            } catch (error) {
                if (error.response.status === 401) {
                    setIsAuth(true);
                    return;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            }
        }
        sendData();
    })

    const sendToAccount = () => {
        history.push('/account');
    }

    return (
        <div>
            <div className="card border-dark mb-3" style={{ maxWidth: 18 + 'rem', margin: 0 + ' auto' }}>
                <div className="card-header"><strong>Stats</strong></div>
                <div className="card-body text-dark">
                    <h5 className="card-title">{rightAnswers.length} / 10</h5>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: (rightAnswers.length) * 10 + '%' }} aria-valuenow={(rightAnswers.length) * 10} aria-valuemin="0" aria-valuemax="100">{(rightAnswers.length) * 10}%</div>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                {
                    data.map((el, i) => (
                        <div key={i}>
                            <div className="card">
                                <small className="card-header">{i + 1}</small>
                                <div className="card-body">
                                    <h5 className="card-title">{he.decode(el.question)}</h5>
                                    <p className="card-text">
                                        Question difficulty {el.difficulty}
                                    </p>
                                    <p className="card-text">
                                        {he.decode(el.category)}
                                    </p>
                                    <p className="card-text">
                                        Correct answer <strong style={{ color: 'green' }}>{he.decode(el.correct_answer)}</strong>
                                    </p>
                                    <p className="card-text">
                                        Player's answer {answers[i].userAnswer === 'not provided' ? <strong>has not been provided for this question.</strong> : <strong style={{ color: (answers[i].userAnswer).trim() === he.decode(el.correct_answer).trim() ? 'green' : 'red' }}>{answers[i].userAnswer}</strong>}
                                    </p>
                                    {
                                        (answers[i].userAnswer).trim() === he.decode(el.correct_answer).trim() ?
                                            <p className="card-text">
                                                +{el.difficulty === 'easy' ? 5 : el.difficulty === 'medium' ? 10 : 15}
                                            </p>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                            <br />
                        </div>
                    ))
                }
            </div>
            <div className="buttonSection">
                <button className="btn btn-primary" onClick={restart}>Play again</button>
                {
                    auth && !isAuth ?
                        <button className="btn btn-success" onClick={sendToAccount}>Go to account</button>
                        :
                        <></>
                }
            </div>
            <br />
        </div>
    )
}

export default Stats
