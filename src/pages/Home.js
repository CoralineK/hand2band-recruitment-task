import React from 'react';
import styled from 'styled-components';
import Search from '../components/Search';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 20%;
  background-image: url('images/background.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Header = styled.h1`
  color: white;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 700;
  font-size: 50px;
  margin: 20px 0;
`;
const Paragraph = styled.p`
  color: white;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
  font-size: 20px;
  margin: 5px;
`;

export default function Home() {
  return (
    <Container>
      <Header>Unsplash</Header>
      <Paragraph>
        The internet's source of <u>freely-usable images.</u>
      </Paragraph>
      <Paragraph>Powered by creators everywhere.</Paragraph>
      <Search />
    </Container>
  );
}
