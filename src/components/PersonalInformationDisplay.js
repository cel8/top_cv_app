import { Component } from "react";

export default class PersonalInformationDisplay extends Component {
  render() {
    const { data } = this.props;
    const firstName = data ? data.firstName : '';
    const lastName  = data ? data.lastName  : '';
    const email     = data ? data.email     : '';
    const phone     = data ? data.phone     : '';
    const location  = data ? data.location  : '';
    return (
      <div>
        <div className="fullname">
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div>{email}</div>
        <div>{phone}</div>
        <div>{location}</div>
      </div>
    );
  }
}