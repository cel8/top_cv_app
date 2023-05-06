
import { Component } from "react";
import uniqid from 'uniqid';

export default class EducationExperienceDisplay extends Component {
  render() {
    const { data } = this.props;
    const educationItems = [];

    if (data) {
      for(let i = 0; i < data.length; i+=1) {
        const education = data[i];
        educationItems.push(
          <div key={uniqid()}>
            <div>{education.schoolname}</div>
            <div>{education.city}</div>
            <div>{education.degree}</div>
            <div>{education.thesis}</div>
            <div>{education.fromData}</div>
            <div>{education.toData}</div>
          </div>
        );
      }
    }

    return (
      <div>{educationItems}</div>
    );
  }
}