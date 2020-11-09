import React from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ImageModal({
  isOpen,
  onClose,
  userImage,
  name,
  modal,
  location,
}) {
  const classes = useStyles();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={classes.paper}>
        <User>
          <Avatar src={userImage} />
          <Paragraph>{name}</Paragraph>
        </User>

        <div
          style={{
            height: '83vh',
            backgroundImage: `url(${`${modal}`})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <Location>
          <img height="20px" src="images/map.svg" />
          <Paragraph>Location: {location}</Paragraph>
        </Location>
      </div>
    </Modal>
  );
}
