import React, { useState } from 'react';
import axios from 'axios';
import Game from './Game';
import Loading from './static/Loading';
import Swal from 'sweetalert2';
import config from './static/config';

function Home() {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [questions, setQuestions] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(null);

    const verify = async () => {
        try {
            const verifyToken = await axios.get(`${config.url}/verify`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth')
                }
            })
            startGame();
        } catch (error) {
            // handle error
            if (error.response.status === 401) {
                if (localStorage.getItem('auth')) {
                    document.querySelector('.logBtn').click();
                }
                Swal.fire({
                    title: 'Disclaimer',
                    text: 'Since you are not logged in or your session token has expired, your score will not be saved. Do you want to continue?',
                    icon: 'info',
                    confirmButtonText: 'Sure, no problem',
                    showCancelButton: true,
                }).then((res) => {
                    if (res.isConfirmed) {
                        startGame();
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try again.',
                })
            }
        }
    }

    const startGame = async () => {
        setIsLoading(true);
        try {
            const gameOptions = {
                category, difficulty, type
            }
            const submitGameOptions = await axios.post(`${config.url}/game`, gameOptions)
            if (submitGameOptions.data.gameData.response_code === 1) {
                // that means that there are no questions
                Swal.fire({
                    title: 'Sorry!',
                    text: 'I am sorry, but there are no questions available for this settings.',
                    icon: 'info',
                    confirmButtonText: 'Ok...',
                })
                setIsLoading(false);
                setIsSubmitted(false);
                setCategory('');
                setDifficulty('');
                setType('')
            } else {
                setQuestions(submitGameOptions.data.gameData);
                setIsLoading(false);
                setIsSubmitted(true);
            }
        } catch (e) {
            // handle error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    const handleGame = async (e) => {
        e.preventDefault();
        verify();
    }

    const handleCategoryInput = (e) => {
        setCategory(e.target.value);
    }

    const handleDifficultyInput = (e) => {
        setDifficulty(e.target.value);
    }

    const handleTypeInput = (e) => {
        setType(e.target.value);
    }

    const restart = () => {
        setIsSubmitted({});
    }

    return (
        <>
            <div>
                <br />
                {
                    isLoading ?
                        <div style={{ textAlign: 'center', marginTop: 18 + 'vh' }}>
                            <Loading />
                        </div>
                        :
                        isSubmitted === true && questions.response_code === 0 ?
                            <div className="container centerSection">
                                <Game questions={questions} restart={restart} setIsSubmitted={setIsSubmitted} auth={localStorage.getItem('auth')} />
                            </div>
                            :
                            <div className="container">
                                <form style={{ marginTop: 14 + 'vh' }}>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select id="category" name="trivia_category" className="form-control" value={category} onChange={handleCategoryInput}>
                                            <option value="any">Any Category</option>
                                            <option value="9">General Knowledge</option>
                                            <option value="10">Entertainment: Books</option>
                                            <option value="11">Entertainment: Film</option>
                                            <option value="12">Entertainment: Music</option>
                                            <option value="13">Entertainment: Musicals &amp; Theatres</option>
                                            <option value="14">Entertainment: Television</option>
                                            <option value="15">Entertainment: Video Games</option>
                                            <option value="16">Entertainment: Board Games</option>
                                            <option value="17">Science &amp; Nature</option>
                                            <option value="18">Science: Computers</option>
                                            <option value="19">Science: Mathematics</option>
                                            <option value="20">Mythology</option>
                                            <option value="21">Sports</option>
                                            <option value="22">Geography</option>
                                            <option value="23">History</option>
                                            <option value="24">Politics</option>
                                            <option value="25">Art</option>
                                            <option value="26">Celebrities</option>
                                            <option value="27">Animals</option>
                                            <option value="28">Vehicles</option>
                                            <option value="29">Entertainment: Comics</option>
                                            <option value="30">Science: Gadgets</option>
                                            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                                            <option value="32">Entertainment: Cartoon &amp; Animations</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div className="mb-3">
                                        <label htmlFor="difficulty" className="form-label">Difficulty</label>
                                        <select id="difficulty" name="trivia_difficulty" className="form-control" value={difficulty} onChange={handleDifficultyInput}>
                                            <option value="any">Any Difficulty</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div className="mb-3">
                                        <label htmlFor="type" className="form-label">Type</label>
                                        <select id="type" name="trivia_type" className="form-control" value={type} onChange={handleTypeInput}>
                                            <option value="any">Any Type</option>
                                            <option value="multiple">Multiple Choice</option>
                                            <option value="boolean">True / False</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div style={{ textAlign: 'center' }}>
                                        <button type="submit" className="btn btn-primary" onClick={handleGame}>
                                            Play
                                        </button>
                                    </div>
                                </form>
                                <div className="rules">
                                    <div>
                                        <small>1 easy question = +5 points</small>
                                    </div>
                                    <div>
                                        <small>1 medium question = +10 points</small>
                                    </div>
                                    <div>
                                        <small>1 hard question = +15 points</small>
                                    </div>
                                </div>
                            </div>
                }
            </div>
        </>
    )
}

export default Home
