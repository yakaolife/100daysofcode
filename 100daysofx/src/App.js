import React, { Component } from "react";
import "./App.css";
import Api from "./Api";
import EntryList from "./components/EntryList";
import TitleList from "./components/TitleList";
import EntryForm from "./components/EntryForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
    this.getEntries = this.getEntries.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "100 days of _";
    this.getEntries();
  }

  getEntries() {
    Api.getEntries().then(response => response.json())
    .then(response => {
      this.setState({ entries: response })
    }).catch(error => console.log("error: ", error));
  }

  onDelete(id) {
    console.log("onDelete, id: ", id);
    const index = this.state.entries.findIndex(e => e.id === id);
    const newEntries = this.state.entries;
    newEntries.splice(index, 1);
    this.setState({entries: newEntries});
    Api.deleteEntry(id);
  }

  onSubmit(entry) {
    console.log("onSubmit");
    Api.newEntry(entry).then(response => response.json())
    .then(response => {
      debugger
      console.log("response:", response);
      // if (response.status === 500) {
      //   //error
      // } else {
      //   debugger
      // }
      //check for errors
      // clean up the entry form
      // Get id and add it back?
    }).catch(error => console.log("error: ", error));
  }

  // onEdit

  render() {

    return (
      <div className="App">
        <EntryForm onSubmit={this.onSubmit} />
        <TitleList list={this.state.entries} />
        <EntryList list={this.state.entries} onDelete={this.onDelete}/>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}

export default App;
