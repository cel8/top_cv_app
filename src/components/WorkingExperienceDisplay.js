
import { Component } from "react";
import uniqid from 'uniqid';
import "./../styles/App.css";
import "./../styles/WorkingExperience.css";

export default class WorkingExperienceDisplay extends Component {
  render() {
    const { data } = this.props;
    const works = [];

    if (data) {
      for(let i = 0; i < data.length; i+=1) {
        const work = data[i];
        works.push(
          <div className="display-item" key={uniqid()}>
            <div className="position">{work.position}</div>
            <div className="company"><div className="companyname">{work.company}</div><div> in {work.city}</div></div>
            <div>{work.fromData} - {work.toData}</div>
          </div>
        );
      }
    }

    return (
      <div className="display-container display-items">
        <div className="display-header">
          <p>Working Experience:</p>
        </div>
        <div className="list-display-items">{works}</div>
      </div>
    );
  }
}