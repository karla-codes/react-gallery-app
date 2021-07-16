import React from 'react';

const Photo = props => {
  const imgUrl = `https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`;
  return (
    <li>
      <img src={imgUrl} alt="" />
    </li>
  );
};

export default Photo;
