import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleXmark, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/PersonalInformation.css";

const patterns = {
  firstName: /^[a-z\s']{1,30}$/i,
  lastName: /^[a-z\s']{1,30}$/i,
  email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  phone: /^\+\d{12}$/,
  location: /^[a-zA-Z0-9\s,'-]*$/i
};

export default class PersonalInformation extends Component {
  constructor(props) {
    super(props);

    /* Internal state */
    this.state = {
      firstName: {
        text: '',
        valid: 'invalid'
      },
      lastName: {
        text: '',
        valid: 'invalid'
      },
      email: {
        text: '',
        valid: 'invalid'
      },
      phone: {
        text: '',
        valid: 'invalid'
      },
      location: {
        text: '',
        valid: 'invalid'
      },
      loaded: false,
      editable: true,
      displayPI: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: ''
      }
    }

    /* Bind events */
    this.onReset  = this.onReset.bind(this);
    this.onEdit   = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  #validate(name, field) {
    if (!patterns[name]) return false;
    if (!patterns[name].test(field.value)) {
      field.setCustomValidity('invalid');
      return false
    }
    field.setCustomValidity('');
    return true;
  }

  #resetFormState() {
    this.setState({firstName: {text: '', valid: 'invalid'}});
    this.setState({lastName: {text: '', valid: 'invalid'}});
    this.setState({email: {text: '', valid: 'invalid'}});
    this.setState({phone: {text: '', valid: 'invalid'}});
    this.setState({location: {text: '', valid: 'invalid'}});
  }

  #setDisplayPIState() {
    const { firstName, lastName, phone, email, location } = this.state;
    this.setState({
      displayPI: {
        firstName: firstName.text,
        lastName: lastName.text,
        email: email.text,
        phone: phone.text,
        location: location.text
      }
    })
    this.props.onUpdateData(this.props.keyUpdate, {
      firstName: firstName.text,
      lastName: lastName.text,
      email: email.text,
      phone: phone.text,
      location: location.text
    });
  }

  #isFormValid() {
    const { firstName, lastName, phone, email, location } = this.state;
    const isValid = (input) => input.valid === 'valid';

    return isValid(firstName) && isValid(lastName) &&
      isValid(phone) && isValid(email) && isValid(location);
  }

  onChange(event) {
    let isValid = 'invalid';
    if (this.#validate(event.target.name, event.target)) {
      isValid = 'valid';
    }

    switch (event.target.name) {
      case 'firstName':
        this.setState({firstName: {text: event.target.value, valid: isValid}})
        break;
        case 'lastName':
          this.setState({lastName: {text: event.target.value, valid: isValid}})
          break;
        case 'email':
          this.setState({email: {text: event.target.value, valid: isValid}})
          break;
        case 'phone':
          this.setState({phone: {text: event.target.value, valid: isValid}})
          break;
        case 'location':
          this.setState({location: {text: event.target.value, valid: isValid}})
          break;
      default: 
        break;
    }
  }

  onEdit(event) {
    const { firstName, lastName, phone, email, location } = this.state.displayPI;
    event.preventDefault();
    this.setState({firstName: {text: firstName, valid: 'valid'}});
    this.setState({lastName: {text: lastName, valid: 'valid'}});
    this.setState({email: {text: email, valid: 'valid'}});
    this.setState({phone: {text: phone, valid: 'valid'}});
    this.setState({location: {text: location, valid: 'valid'}});
    this.setState({editable: true});
  }

  onReset(event) {
    event.preventDefault();
    this.#resetFormState();
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.#isFormValid()) return;
    this.setState({loaded: true});
    this.setState({editable: false});
    this.#setDisplayPIState();
  }

  render() {
    const { firstName, lastName, phone, email, location, loaded, editable } = this.state;
    return (
      <div className="edit-container">
        <div className="edit-header">
          <p>Personal Information:</p>
          <button disabled={!loaded} onClick={this.onEdit}><FontAwesomeIcon icon={faSquarePen}/> Edit</button>
        </div>
        <form className="edit-form">
          <label htmlFor="pi-first-name">First name</label>
          <input id="pi-first-name" name="firstName" type="text" value={firstName.text} className={firstName.valid} onChange={this.onChange}></input>
          <label htmlFor="pi-last-name">Last name</label>
          <input id="pi-last-name" name="lastName" type="text" value={lastName.text} className={lastName.valid} onChange={this.onChange}></input>
          <label htmlFor="pi-email">E-mail</label>
          <input id="pi-email" name="email" type="text" value={email.text} className={email.valid} onChange={this.onChange}></input>
          <label htmlFor="pi-phone">Phone number</label>
          <input id="pi-phone" name="phone" type="text" value={phone.text} className={phone.valid} onChange={this.onChange}></input>
          <label htmlFor="pi-location">Location</label>
          <input id="pi-location" name="location" type="text" value={location.text} className={location.valid} onChange={this.onChange}></input>
          <button disabled={!editable} onClick={this.onReset}><FontAwesomeIcon icon={faCircleXmark}/> Cancel</button>
          <button disabled={!editable} type="submit" onClick={this.onSubmit}><FontAwesomeIcon icon={faArrowRight}/> Submit</button>
        </form>
      </div>
    );
  }
}