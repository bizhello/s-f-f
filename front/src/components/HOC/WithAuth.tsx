import React, { FC } from 'react';
import HeaderWithAuth from '../Header/withAuth';
import { IRegistryRes } from '../../common/interfaces/IAuth';

interface IProps {
    children: JSX.Element | JSX.Element[];
    currentUser: IRegistryRes;
}

const WithAuth: FC = ({ children, currentUser }) => {

    return (
        <>
            <HeaderWithAuth currentUser={currentUser} />
            {children}
        </>
    );
}

export default WithAuth;