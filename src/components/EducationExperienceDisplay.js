
import { Component } from "react";
import uniqid from 'uniqid';
import "./../styles/App.css";
import "./../styles/EducationExperience.css";

export default class EducationExperienceDisplay extends Component {
  render() {
    const { data } = this.props;
    const educationItems = [];

    if (data) {
      for(let i = 0; i < data.length; i+=1) {
        const education = data[i];
        educationItems.push(
          <div className="display-item" key={uniqid()}>
            <div className="school"><div className="schoolname">{education.schoolname}</div><div>in {education.city}</div></div>
            <div className="role">{education.degree}</div>
            <div>{education.thesis}</div>
            <div>{education.fromData} - {education.toData}</div>
          </div>
        );
      }
    }

    return (
      <div className="display-container display-items">
        <div className="display-header">
          <p>Education:</p>
        </div>
        <div className="list-display-items">{educationItems}</div>
      </div>
    );
  }
}