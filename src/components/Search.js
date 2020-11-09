import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Context from '../Context';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { promptTopics, searchPhotos } from '../API';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    margin: '10px 0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  results: {
    backgroundColor: '#d4d4d4',
    borderRadius: '30px',
    margin: '10px auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Form = styled.form`
  position: relative;
`;
const TopicsContainer = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
const Prompt = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  margin: 5px 15px;
`;
const NoResults = styled.div`
  padding: 5px 21px;
  font: 400 15px Arial;
`;

export default function CustomizedInputBase() {
  const classes = useStyles();
  const history = useHistory();

  const { state, action } = useContext(Context);

  useEffect(() => {
    if (state.query.length >= 3) {
      promptTopics(state.query).then((data) => action.setTopicsList(data));
    } else {
      promptTopics('').then((data) => action.setTopicsList(data));
    }
  }, [state.query]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          searchPhotos(state.query, 1).then((result) => {
            action.setPhotos(result);
            action.setSubmitted(true);
            action.setTitle(state.query);
            action.setPath('/results');
            history.push('/results');
          });
        }}
      >
        <Paper
          className={`${classes.root} ${
            state.path === '/results' && classes.results
          }`}
        >
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search free high-resolution photos"
            inputProps={{ 'aria-label': 'search photos' }}
            value={state.query}
            onChange={(e) => {
              action.setQuery(e.target.value);
              action.setSubmitted(false);
            }}
          />
        </Paper>
        {state.submitted === false && (
          <TopicsContainer>
            {state.topicsList.length === 0 && state.query.length >= 3 && (
              <NoResults>no results</NoResults>
            )}
            {state.topicsList.map((topic) => (
              <Prompt
                type="submit"
                key={topic}
                value={topic}
                onClick={(e) => {
                  e.preventDefault();
                  searchPhotos(e.target.value).then((result) => {
                    action.setPhotos(result);
                    action.setSubmitted(true);
                    action.setTitle(e.target.value);
                    action.setPath('/results');
                    history.push('/results');
                  });
                }}
              />
            ))}
          </TopicsContainer>
        )}
      </Form>
    </>
  );
}
