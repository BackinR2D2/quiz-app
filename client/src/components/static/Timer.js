import React, { useState, useEffect } from 'react'

function Timer({ time }) {
    const [t, setT] = useState(time);
    useEffect(() => {
        setTimeout(() => {
            setT(t - 1);
        }, 1000);
    }, [t])
    return (
        <span className="spanTimer">
            {t}s
        </span>
    )
}

export default Timer
