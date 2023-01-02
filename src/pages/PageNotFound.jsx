
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Error404 from '../components/Error404';

export const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-center vh-100">
            <div className="row align-items-center">
                <div className="col">
                    <h1 className="text-center mt-4 mb-4">
                        You are all alone here.

                        <Error404 height={200} />

                    </h1>
                    <p className="h3 pb-3">
                        Page not found.

                    </p>
                    <button className='btn bg-light text-dark'
                        onClick={() => navigate('/')}
                    >Back to home</button>
                </div>
            </div>
        </div>

    )
}
