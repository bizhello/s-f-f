import React, { FC } from 'react';
import HeaderWithoutAuth from '../Header/withoutAuth';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const WithoutAuth: FC = ({ children }) => {
    return (
        <>
            <HeaderWithoutAuth />
            {children}
        </>
    );
}

export default WithoutAuth;