import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading() {
    return (
        <div className="center">
            <CircularProgress size={100} thickness={2} color={'primary'} />
        </div>
    );
}

export default Loading
