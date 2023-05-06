import React, { Component } from 'react';
import PersonalInformation from './components/PersonalInformation';
import EducationExperience from './components/EducationExperience';
import WorkingExperience from './components/WorkingExperience';
import PersonalInformationDisplay from './components/PersonalInformationDisplay';
import EducationExperienceDisplay from './components/EducationExperienceDisplay';
import WorkingExperienceDisplay from './components/WorkingExperienceDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import "./styles/App.css";

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
    const curYear = new Date().getFullYear();
    return (
      <div className="App">
        <div className="App-cv">
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
        <footer className="App-footer">
          <div>Copyright © {curYear} - Alessandro Celotti <a className="App-link" href="https://github.com/cel8"><FontAwesomeIcon icon={faGithub}/></a></div>
        </footer>
      </div>
    );
  }
}