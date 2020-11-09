import React, { useState } from 'react';
import Context from './Context';
import Router from './Router';

function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [path, setPath] = useState('/');
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState('');
  const [name, setName] = useState();
  const [userImage, setUserImage] = useState();
  const [location, setLocation] = useState();
  const [page, setPage] = useState(1);

  return (
    <Context.Provider
      value={{
        state: {
          query,
          photos,
          topicsList,
          submitted,
          title,
          path,
          open,
          modal,
          name,
          userImage,
          location,
          page,
        },
        action: {
          setQuery,
          setPhotos,
          setTopicsList,
          setSubmitted,
          setTitle,
          setPath,
          setOpen,
          setModal,
          setName,
          setUserImage,
          setLocation,
          setPage,
        },
      }}
    >
      <Router />
    </Context.Provider>
  );
}

export default App;
