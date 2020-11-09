import React from 'react';
import styled from 'styled-components';

const PhotosBox = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Photo = styled.div`
  margin: 10px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
`;

const Button = styled.button`
  width: 1090px;
  height: 50px;
  margin-bottom: 20px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
  font-size: 20px;
  background-color: white;
  border: 0.5px solid grey;
`;

export default function ImageList({ photos, onImageClick, loadMore }) {
  return (
    <PhotosBox>
      {photos.map((photo) => (
        <Photo key={photo.id}>
          <Image
            alt={photo.alt_description}
            src={photo.urls.full}
            onClick={() => onImageClick(photo)}
          ></Image>
        </Photo>
      ))}
      {photos.length > 0 && <Button onClick={loadMore}>See more</Button>}
    </PhotosBox>
  );
}
