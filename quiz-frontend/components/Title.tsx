import React from 'react';

const Title = (props: any) => {
  return (
    <div className="bg-gray-dark my-2 mb-4 shadow-md rounded-md w-full px-4">
      <div className="text-center uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl py-5 text-white font-outline-2 font-extrabold">
        {props.title}
      </div>
    </div>
  );
};

export default Title;