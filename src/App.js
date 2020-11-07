import React from "react";
import { Container, Header } from "semantic-ui-react";
import { getSportsArticles, getEnterArticles, getTechArticles } from "./api.js";
import { Button} from "semantic-ui-react";
import { ArticleList } from "./components/Articles.js";



class App extends React.Component {
  state = {
    entertainment: [],
    sports: [],
    entertainment: [],
    showenter: false,
    showtech: false,
    showsport: false,
    loading: false,
    apiError: ""
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

  showEnter = () => {
    this.setState({ showenter: true })
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
        this.setState({ showsport: !this.state.showsport, showtech: false, showenter: false });
        break;
      case "tech":
        this.setState({ showtech: !this.state.showtech, showsport: false, showenter: false });
        break;
      case "enter":
        this.setState({ showenter: !this.state.showenter, showtech: false, showsport: false });
        break;
      default:
        return null;

    }
  }

  render() {
    const {
      sports,
      tech,
      entertainment,
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
        <div class="ui blue inverted segment">
          <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
            Be Part of It!
        </Header>
          <div class="ui two column centered grid">
            <div class="ui buttons" margin="auto">
              <Button color='grey' onClick={() => this.hideComponent("sports")}>
                Sports News
          </Button>
              <div class="or"></div>
              <Button color='grey' onClick={() => this.hideComponent("tech")}>
                Technology News
          </Button>
              <div class="or"></div>
              <Button color='grey' onClick={() => this.hideComponent("enter")}>
                Entertainment News
          </Button>
            </div>
          </div>
          <br></br>
        </div>



        {showenter && entertainment.length > 0 && <ArticleList articles={entertainment} />}
        {showtech && tech.length > 0 && <ArticleList articles={tech} />}
        {showsport && sports.length > 0 && <ArticleList articles={sports} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}




      </Container>
    );
  }
}

export default App;