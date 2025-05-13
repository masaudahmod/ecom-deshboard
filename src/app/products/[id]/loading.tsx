import React from 'react';
import Image from 'next/image';
import loader from '../../../assets/loader-wifi.svg';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <Image
        src={loader}
        alt="Loading..."
        className="animate-spin"
        width={80}
        height={80}
        priority
      />
    </div>
  );
};

export default Loading;
