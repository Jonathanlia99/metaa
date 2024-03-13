
import React from 'react';
import NotFoundImg from '../images/no-results.png'
const NotFoundPage = () => {
    return (
        <div className='flex justify-center items-center mt-16'>
            <div className='text-center'>
                <img className='w-auto h-24 mb-4' src={NotFoundImg} style={{ margin: '0 auto' }} />

                <h1 className='text-2xl font-bold font-["roboto"] mt-6'>Error 404 - Page Not Found</h1>
                <p className='text-xl'>Sorry, the page you are looking for could not be found.</p>
            </div>
        </div>
    );
}

export default NotFoundPage;
