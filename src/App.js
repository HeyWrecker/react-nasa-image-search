import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table,
  Input,
} from 'semantic-ui-react'

function SearchInput(props) {
    return (
      <Input  fluid
              icon='images'
              iconPosition='left'
              placeholder='Search images...'
              onInput={(e) => props.onInput(e.target.value)}
              value={props.value}
              loading={props.loading}
      />
    );
}

function SearchButton(props) {
    return (
        <Button primary
                onClick={(e) => props.onClick(e)}
                disabled={props.disabled}>
            Search
        </Button>
    );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      isLoading: false,
    }
  }

  handleInput(query) {
    const searchTerm = query;

    this.setState({
      searchTerm: searchTerm,
    });
  }

  handleClick(e) {
    const searchTerm = this.state.searchTerm;
    if (searchTerm !== '') {

      this.setState({
        isLoading: true
      });

      const getResults = async () => {
        try {
          const results = await axios.get('https://images-api.nasa.gov/search?q=' + searchTerm);

          if (results.status === 200) {
            this.setState({
              searchResults: results.data.collection.items,
              isLoading: false
            });
          } else {
           /* Handle generic non 200 error TODO */
          }
        } catch(error) {
          console.log('Error:', error)
        }
      }

      getResults();
    } else {
      alert('Your search must not be empty.');
    }
  }

  render() {
      const currentSearchTerm = this.state.searchTerm;
      const isLoading = this.state.isLoading;

      return (
        <div className="App">
          <Container text>
            <Header as='h2'>
                NASA Image Search
            </Header>

            <Grid columns={2} stackable verticalAlign='middle'>
              <Grid.Column width={12}>
                <SearchInput value={currentSearchTerm}
                             onInput={(query) => this.handleInput(query)}
                             loading={isLoading} />
              </Grid.Column>
              <Grid.Column width={4}>
                <SearchButton onClick={(e) => this.handleClick(e)}
                              disabled={isLoading} />
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      );
  }
}

export default App;
