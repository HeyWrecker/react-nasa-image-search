import React from 'react';
import ReactDOM from 'react-dom';
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
      <Input fluid
             icon='images'
             iconPosition='left'
             placeholder='Search images...'
             onInput={(e) => props.onInput(e.target.value)}
             value={props.value} />
    );
}

function SearchButton(props) {
    return (
        <Button primary
          onClick={(e) => props.onClick(e.target.value)}>
            Search
        </Button>
    );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  handleInput(query) {
    const searchTerm = query;

    this.setState({
      searchTerm: searchTerm
    });
  }

  handleClick() {
    const searchTerm = this.state.searchTerm;

    alert('Searching for: ' + searchTerm)
  }

  render() {
      const currentSearchTerm = this.state.searchTerm;
      return (
        <div className="App">
          <Container text>
            <Header as='h2'>
                NASA Image Search
            </Header>

            <Grid columns={2} stackable verticalAlign='middle'>
              <Grid.Column width={12}>
                <SearchInput value={currentSearchTerm}
                             onInput={(value) => this.handleInput(value)} />
              </Grid.Column>
              <Grid.Column width={4}>
                <SearchButton onClick={() => this.handleClick()} />
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      );
  }
}

export default App;
