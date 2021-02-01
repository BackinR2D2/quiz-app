import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Auth(props) {
    const { Component, ...rest } = props;
    if (localStorage.getItem('auth')) {
        return <Component {...rest} />
    } else {
        return <Redirect to="/" />
    }
}