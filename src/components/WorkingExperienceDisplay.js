
import { Component } from "react";
import uniqid from 'uniqid';

export default class WorkingExperienceDisplay extends Component {
  render() {
    const { data } = this.props;
    const works = [];

    if (data) {
      for(let i = 0; i < data.length; i+=1) {
        const work = data[i];
        works.push(
          <div key={uniqid()}>
            <div>{work.position}</div>
            <div>{work.company}</div>
            <div>{work.city}</div>
            <div>{work.fromData}</div>
            <div>{work.toData}</div>
          </div>
        );
      }
    }

    return (
      <div>{works}</div>
    );
  }
}