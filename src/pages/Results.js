import React, { useContext } from 'react';
import styled from 'styled-components';
import Search from '../components/Search';
import Context from '../Context';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { photoLocation } from '../API';
import { searchPhotos } from '../API';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    maxHeight: '95vh',
    display: 'block',
    margin: '2.5vh auto',
  },
}));

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
`;
const PhotosBox = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Photo = styled.div`
  margin: 10px;
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
const Header = styled.h1`
  font-family: 'Ubuntu', sans-serif;
  font-weight: 700;
  font-size: 50px;
  margin: 20px 0;
`;
const Avatar = styled.img`
  border-radius: 50%;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Paragraph = styled.p`
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
  font-size: 15px;
  margin-left: 10px;
`;
const Location = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export default function Home() {
  const classes = useStyles();
  const { state, action } = useContext(Context);

  const handleOpen = () => {
    action.setOpen(true);
  };

  const handleClose = () => {
    action.setOpen(false);
  };

  return (
    <Container>
      <Search />
      <Header>{state.title}</Header>
      <PhotosBox>
        {state.photos.map((photo) => (
          <Photo key={photo.id}>
            <Image
              alt={photo.alt_description}
              src={photo.urls.full}
              onClick={() => {
                handleOpen();
                action.setModal(photo.urls.full);
                action.setName(photo.user.name);
                action.setUserImage(photo.user.profile_image.small);
                photoLocation(photo.id).then((data) =>
                  action.setLocation(data),
                );
              }}
            ></Image>
          </Photo>
        ))}
        <Button
          onClick={() => {
            searchPhotos(state.query, state.photos.length / 9 + 1).then(
              (result) => {
                console.log(state.photos.length);
                action.setPhotos([...state.photos, ...result]);
              },
            );
          }}
        >
          See more
        </Button>
        <Modal open={state.open} onClose={handleClose}>
          <div className={classes.paper}>
            <User>
              <Avatar src={state.userImage} />
              <Paragraph>{state.name}</Paragraph>
            </User>

            <div
              style={{
                height: '83vh',
                backgroundImage: `url(${`${state.modal}`})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <Location>
              <img height="20px" src="images/map.svg" />
              <Paragraph>Location: {state.location}</Paragraph>
            </Location>
          </div>
        </Modal>
      </PhotosBox>
    </Container>
  );
}
