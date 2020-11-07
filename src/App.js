import React from "react";
import { Container, Header } from "semantic-ui-react";
import { getSportsArticles, getEnterArticles, getTechArticles, doUserSearch } from "./api.js";
import { Button, Form } from "semantic-ui-react";
import { ArticleList } from "./components/Articles.js";
import FormSearch from "./components/Form.js";



class App extends React.Component {
  state = {
    entertainment: [],
    sports: [],
    entertainment: [],
    articles: [],
    showenter: false,
    showtech: false,
    showsport: false,
    showsearched: false,
    apiError: "",
    searchfield: ""
  };




  handleSports = (result) => {
    try {
      this.setState({ sports: result.articles });
    } catch (error) {
      this.setState({ apiError: "Could not find sports articles" });
    }
  }
  handleEntertainment = (result) => {
    try {
      this.setState({ entertainment: result.articles });
    } catch (error) {
      this.setState({ apiError: "Could not find entertainment articles" });
    }
  }
  handleTech = (result) => {
    try {
      this.setState({ tech: result.articles });
    } catch (error) {
      this.setState({ apiError: "Could not find tech articles" });
    }
  }
  

  searcharticles = async search => {
    try {
      const response = await doUserSearch(search);
      this.setState({
        articles: response.articles,
        searchfield: search,
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
  }

  async componentDidMount() {
    await Promise.all([
      getSportsArticles().then(this.handleSports),
      getEnterArticles().then(this.handleEntertainment),
      getTechArticles().then(this.handleTech),
    ]);
    // All fetch calls are done now
  }
  hideComponent(name) {
    console.log(name);
    switch (name) {
      case "sports":
        this.setState({ showsport: !this.state.showsport, showtech: false, showenter: false, showsearched: false });
        break;
      case "tech":
        this.setState({ showtech: !this.state.showtech, showsport: false, showenter: false, showsearched: false });
        break;
      case "enter":
        this.setState({ showenter: !this.state.showenter, showtech: false, showsport: false, showsearched: false});
        break;
      case "search":

        this.setState({ showsearched: !this.showsearched, showtech: false, showsport: false, showenter: false });
        break;
      default:
        return null;

    }
  }

  render() {
    const {
      sports,
      tech,
      articles,
      showsearched,
      entertainment,
      searchfield,
      showenter,
      showtech,
      showsport,
      apiError
    } = this.state;

    return (
      <Container style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ textAlign: "center" }}>
          Powered by <a href="https://newsapi.org/">NewsAPI.org</a>
        </p>
        <div className="ui blue inverted segment">
          <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
            Be Part of It!
        </Header>
          <div className="ui two column centered grid">
            <div className="ui buttons" margin="auto">
              <Button color='grey' onClick={() => this.hideComponent("sports")}>
                Top Sports News
          </Button>
              <div className="or"></div>
              <Button color='grey' onClick={() => this.hideComponent("tech")}>
                Top Technology News
          </Button>
              <div className="or"></div>
              <Button color='grey' onClick={() => this.hideComponent("enter")}>
                Top Entertainment News
          </Button>
            </div>
          </div>
          <br></br>
          <br></br>
          <FormSearch searcharticles={this.searcharticles} />
          
        </div>
        


        {articles.length > 0 && <ArticleList articles={articles} />}
        {showenter && entertainment.length > 0 && <ArticleList articles={entertainment} />}
        {showtech && tech.length > 0 && <ArticleList articles={tech} />}
        {showsport && sports.length > 0 && <ArticleList articles={sports} />}
        {articles.length > 0 && <ArticleList articles={articles} />}

        {apiError && <p>Could not fetch any articles. Please try again.</p>}




      </Container>
    );
  }
}

export default App;