import React, { Component } from "react";
import "./App.css";
import Api from "./Api";
import EntryList from "./components/EntryList";
import TitleList from "./components/TitleList";
import EntryForm from "./components/EntryForm";
import Header from "./components/Header";

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
    console.log("App componentDidMount");
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
    if(entry.id){
      console.log("Update entry");
      Api.updateEntry(entry).then(response => response.json())
      .then(response => {
        console.log("response: ", response);
        this.getEntries();
      }).catch(error => console.log("error:", error)); 
    } else {
      Api.newEntry(entry).then(response => response.json())
      .then(response => {
        this.getEntries();
      }).catch(error => console.log("error: ", error));
    }
   
    return false;
  }

  render() {

    return (
      <div className="App">
        <Header />
        <EntryForm onSubmit={this.onSubmit} />
        <TitleList list={this.state.entries} />
        <EntryList list={this.state.entries} onSubmit={this.onSubmit} onDelete={this.onDelete}/>
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
