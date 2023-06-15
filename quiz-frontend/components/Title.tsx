import React from 'react';

const Title = (props: any) => {
    {props.title}
    return (


        <div className="bg-gray-dark my-10 shadow-md strong rounded-md container">
            <div className="place-items-center text-center uppercase sm:text-xl md:text-2xl lg:text-4xl py-5 text-white font-outline-2 font-extrabold shadow">{props.title}</div>
        </div>

    );
};

export default Title;