import React, { Component } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "./EventFormModal.css";
import "react-datetime/css/react-datetime.css";
import axios from "axios";
import Events from "./Events";

Modal.setAppElement("#root");
const api = axios.create({
  baseURL: `http://localhost:5000`,
});

class EventFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      participants: "",
      date: "",
      time: "",
      duration: "",
      notes: "",
      token: "",
      postedEvent: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      date: date.format("DD-MM-YYYY"),
    });
  };

  handleTimeChange = (time) => {
    this.setState({
      time: time.format("hh:mm A"),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const tkn = {
      code: this.state.token,
    };
    api.post("/", tkn).then((res) => this.setState({ postedEvent: true }));
    console.log(tkn);
  };
  render() {
    if (this.state.postedEvent) {
      return <Events />;
    }
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Create Event"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Create Event</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="participants">List of Participants</label>
          <input
            type="text"
            name="participants"
            value={this.state.participants}
            onChange={this.handleChange}
            placeholder="Separate emails with commas"
            required
          />
          <label>Date</label>
          <Datetime
            name="date"
            value={this.state.date}
            onChange={this.handleDateChange}
            dateFormat="DD-MM-YYYY"
            timeFormat={false}
            required
          />
          <label>Time</label>
          <Datetime
            name="time"
            value={this.state.time}
            onChange={this.handleTimeChange}
            dateFormat={false}
            inputProps={{ placeholder: "hh:mm AM/PM" }}
            required
          />
          <label htmlFor="duration">Duration (hrs)</label>
          <input
            type="number"
            name="duration"
            value={this.state.duration}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="notes">Session Notes</label>
          <textarea
            name="notes"
            value={this.state.notes}
            onChange={this.handleChange}
          />
          <input type="submit" value="Create Event" class="styled-button" />
        </form>
      </Modal>
    );
  }
}

export default EventFormModal;
