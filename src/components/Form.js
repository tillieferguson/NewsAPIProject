import React from "react";
import { Button, Form } from "semantic-ui-react";

class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchfield: "" ,showsearched:false};
  }

  handleChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  handleSubmit = event => {
    this.state.showsearched = true;
    event.preventDefault();
    this.props.searcharticles(this.state.searchfield);
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Entertainment, Tech, Sports News"
              value={this.state.searchfield}
              onChange={this.handleChange}
            />
            <Button type="submit" color="grey">
            <i className="search icon"></i>
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default FormSearch;

