import React, { useContext } from 'react';
import styled from 'styled-components';
import Search from '../components/Search';
import ImageList from '../components/ImageList';
import ImageModal from '../components/ImageModal';
import Context from '../Context';
import { photoLocation, searchPhotos } from '../API';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-family: 'Ubuntu', sans-serif;
  font-weight: 700;
  font-size: 50px;
  margin: 20px 0;
`;

export default function Home() {
  const { state, action } = useContext(Context);

  const handleOpen = () => {
    action.setOpen(true);
  };

  const handleClose = () => {
    action.setOpen(false);
  };

  const handleImageClick = (photo) => {
    handleOpen();
    action.setModal(photo.urls.full);
    action.setName(photo.user.name);
    action.setUserImage(photo.user.profile_image.small);
    photoLocation(photo.id).then((data) => action.setLocation(data));
  };

  const handleLoadMore = () => {
    searchPhotos(state.query, state.photos.length / 9 + 1).then((result) => {
      action.setPhotos([...state.photos, ...result]);
    });
  };

  return (
    <Container>
      <Search />
      <Header>{state.title}</Header>
      <ImageList
        photos={state.photos}
        onImageClick={handleImageClick}
        loadMore={handleLoadMore}
      />
      <ImageModal
        isOpen={state.open}
        onClose={handleClose}
        userImage={state.userImage}
        name={state.name}
        modal={state.modal}
        location={state.location}
      />
    </Container>
  );
}
