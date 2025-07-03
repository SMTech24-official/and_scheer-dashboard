import React from 'react';

import image from '../../assets/mainlogo.png'

type LogoProps = {
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({
  width = 40,
  height = 40,
  src = image,
  alt = 'Logo',
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
};

export default Logo;