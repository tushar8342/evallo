import React, { Component } from "react";
import "./App.css";
import Events from "./components/Events";
import EventFormModal from "./components/EventFormModal";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000`,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      postedEvent: false,
      isModalOpen: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const tkn = {
      code: this.state.token,
    };
    console.log(tkn);
    api.post("/", tkn).then((res) => this.setState({ postedEvent: true }));
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleEventSubmit = (eventData) => {
    console.log(eventData);
    axios
      .post("/events", eventData)
      .then((res) => this.setState({ postedEvent: true, isModalOpen: false }));
  };

  render() {
    if (this.state.postedEvent) {
      return <Events />;
    }
    return (
      <div className="App">
        <div className="form">
          <form method="POST" onSubmit={this.handleSubmit}>
            <a
              className="button"
              rel="noopener noreferrer"
              target="_blank"
              href="https://accounts.google.com/signin/oauth/oauthchooseaccount?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=1073125779529-9vn6rrr2mprr6utd4d59fhau9q261mtv.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&o2v=2&as=IgttvtH7j1tEmURopY28CA&flowName=GeneralOAuthFlow"
            >
              Sign In
            </a>
            <span>Signup First To Schedule A Event</span>
            <br />
          </form>
          <button className="button" onClick={this.openModal}>
            Create Event
          </button>
        </div>
        <EventFormModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          onSubmit={this.handleEventSubmit}
        />
      </div>
    );
  }
}

export default App;
