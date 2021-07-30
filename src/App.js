import React from 'react';
import axios from 'axios';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  List,
  Input,
  Card
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
      const searchResults = this.state.searchResults;
      const cards = searchResults.map((item) => {
        if (item.links !== undefined) {
          const id = item.data[0].nasa_id;
          const title = item.data[0].title ? item.data[0].title : 'N/A';
          const photographer = item.data[0].photographer ? item.data[0].photographer : 'Unknown';
          const location = item.data[0].location ? item.data[0].location : 'Unknown';
          const previewSrc = item.links[0].href;

          return (
            <Card key={id} className="fluid">
              <Image size="medium" src={previewSrc} wrapped ui={false} />
              <Card.Content>
                <Card.Header>
                  {title}
                </Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="left">
                <List>
                  <List.Item>
                    <b>Photographer:</b> {photographer}
                  </List.Item>
                  <List.Item>
                    <b>Location:</b> {location}
                  </List.Item>
                </List>
              </Card.Content>
            </Card>
          )
        } else {
          return null
        }
      });

      return (
        <div className="App">
          <Container>
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

            <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
              {cards}
            </Card.Group>
          </Container>
        </div>
      );
  }
}

export default App;
