import './App.css';
import React, { Component } from 'react';
import PersonalInformation from './components/PersonalInformation';
import PersonalInformationDisplay from './components/PersonalInformationDisplay';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pi: undefined,
      ee: [],
      we: [],
      keys: {
        keyPI: 'personal-information',
        keyEE: 'education-experience',
        keyWE: 'working-experience'
      }
    };

    this.onUpdateData = this.onUpdateData.bind(this);
  }

  onUpdateData(node, data) {
    const { keyPI, keyEE, keyWE } = this.state.keys;
    if (keyPI === node)
      this.setState({pi: data});
    else if (keyEE === node)
      this.setState({ee: data});
    else if (keyWE === node)
      this.setState({we: data});
  }

  render() {
    const { keyPI, keyEE, keyWE } = this.state.keys;
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div>
          <PersonalInformation keyUpdate={keyPI} onUpdateData={this.onUpdateData}/>
        </div>
        <div>
          <PersonalInformationDisplay data={this.state.pi}/>
        </div>
      </div>
    );
  }
}