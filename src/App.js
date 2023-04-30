import './App.css';
import React, { Component } from 'react';
import PersonalInformation from './components/PersonalInformation';
import EducationExperience from './components/EducationExperience';
import WorkingExperience from './components/WorkingExperience';
import PersonalInformationDisplay from './components/PersonalInformationDisplay';
import EducationExperienceDisplay from './components/EducationExperienceDisplay';
import WorkingExperienceDisplay from './components/WorkingExperienceDisplay';

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
          <EducationExperience keyUpdate={keyEE} onUpdateData={this.onUpdateData}/>
          <WorkingExperience keyUpdate={keyWE} onUpdateData={this.onUpdateData}/>
        </div>
        <div>
          <PersonalInformationDisplay data={this.state.pi}/>
          <EducationExperienceDisplay data={this.state.ee}/>
          <WorkingExperienceDisplay data={this.state.we}/>
        </div>
      </div>
    );
  }
}