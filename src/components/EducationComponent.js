import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/EducationExperience.css";

const patterns = {
  schoolname: /^[a-z\s']{1,50}$/i,
  degree: /^[a-z\s']{1,50}$/i,
  thesis: /^[a-z\s']{1,50}$/i,
  city: /^[a-zA-Z0-9\s,'-]*$/i,
  fromData: /^\d{4}$/i,
  toData: /^(\d{4}|present)$/i
};

export default class EducationComponent extends Component {
  constructor(props) {
    super(props);

    /* Internal state */
    this.state = {
      schoolname: {
        text: '',
        valid: 'invalid'
      },
      city: {
        text: '',
        valid: 'invalid'
      },
      degree: {
        text: '',
        valid: 'invalid'
      },
      thesis: {
        text: '',
        valid: 'invalid'
      },
      fromData: {
        text: '',
        valid: 'invalid'
      },
      toData: {
        text: '',
        valid: 'invalid'
      },
      displayEducation: {
        schoolname: '',
        city: '',
        degree: '',
        thesis: '',
        fromData: '',
        toData: ''
      }
    }

    /* Bind events */
    this.onReset    = this.onReset.bind(this);
    this.onSubmit   = this.onSubmit.bind(this);
    this.onChange   = this.onChange.bind(this);
    this.doEditForm = this.doEditForm.bind(this);

    this.props.setCallables({
      doEditForm: this.doEditForm
   });
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
    this.setState({schoolname: {text: '', valid: 'invalid'}});
    this.setState({city: {text: '', valid: 'invalid'}});
    this.setState({degree: {text: '', valid: 'invalid'}});
    this.setState({thesis: {text: '', valid: 'invalid'}});
    this.setState({fromData: {text: '', valid: 'invalid'}});
    this.setState({toData: {text: '', valid: 'invalid'}});
  }

  #setDisplayWorkState() {
    const { schoolname, city, degree, thesis, fromData, toData } = this.state;
    this.setState({
      displayEducation: {
        schoolname: schoolname.text,
        city: city.text,
        degree: degree.text,
        thesis: thesis.text,
        fromData: fromData.text,
        toData: toData.text
      }
    })
    this.props.onUpdateData(this.props.uuid, {
      schoolname: schoolname.text,
      city: city.text,
      degree: degree.text,
      thesis: thesis.text,
      fromData: fromData.text,
      toData: toData.text
    });
  }

  #isFormValid() {
    const { schoolname, city, degree, thesis, fromData, toData } = this.state;
    const isValid = (input) => input.valid === 'valid';

    return isValid(schoolname) && isValid(city) && isValid(degree) &&
      isValid(thesis) && isValid(fromData) && isValid(toData);
  }

  onChange(event) {
    let isValid = 'invalid';
    if (this.#validate(event.target.name, event.target)) {
      isValid = 'valid';
    }

    switch (event.target.name) {
      case 'schoolname':
        this.setState({schoolname: {text: event.target.value, valid: isValid}})
        break;
      case 'city':
        this.setState({city: {text: event.target.value, valid: isValid}})
        break;
      case 'degree':
        this.setState({degree: {text: event.target.value, valid: isValid}})
        break;
      case 'thesis':
        this.setState({thesis: {text: event.target.value, valid: isValid}})
        break;
      case 'fromData':
        this.setState({fromData: {text: event.target.value, valid: isValid}})
        break;
      case 'toData':
        this.setState({toData: {text: event.target.value, valid: isValid}})
        break;
      default: 
        break;
    }
  }

  doEditForm() {
    const { schoolname, city, degree, thesis, fromData, toData } = this.state.displayEducation;
    this.setState({schoolname: {text: schoolname, valid: 'valid'}});
    this.setState({city: {text: city, valid: 'valid'}});
    this.setState({degree: {text: degree, valid: 'valid'}});
    this.setState({thesis: {text: thesis, valid: 'valid'}});
    this.setState({fromData: {text: fromData, valid: 'valid'}});
    this.setState({toData: {text: toData, valid: 'valid'}});
  }

  onReset(event) {
    event.preventDefault();
    this.#resetFormState();
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.#isFormValid()) return;
    this.#setDisplayWorkState();
  }

  render() {
    const { schoolname, city, degree, thesis, fromData, toData } = this.state;
    return (
      <form className="education-item-form">
        <label htmlFor="education-schoolname">University or School name</label>
        <input id="education-schoolname" name="schoolname" type="text" value={schoolname.text} placeholder="Name" className={schoolname.valid} onChange={this.onChange}></input>
        <label htmlFor="education-city">City</label>
        <input id="education-city" name="city" type="text" value={city.text} placeholder="Name" className={city.valid} onChange={this.onChange}></input>
        <label htmlFor="education-degree">Degree title</label>
        <input id="education-degree" name="degree" type="text" value={degree.text} placeholder="Qualification" className={degree.valid} onChange={this.onChange}></input>
        <label htmlFor="education-thesis">Thesis title</label>
        <input id="education-thesis" name="thesis" type="text" value={thesis.text} placeholder="Title" className={thesis.valid} onChange={this.onChange}></input>
        <label htmlFor="education-fromData">From:</label>
        <input id="education-fromData" name="fromData" type="text" value={fromData.text} placeholder="YYYY" className={fromData.valid} onChange={this.onChange}></input>
        <label htmlFor="education-toData">To:</label>
        <input id="education-toData" name="toData" type="text" value={toData.text} placeholder="YYYY or Present" className={toData.valid} onChange={this.onChange}></input>
        <button disabled={!this.props.editable} onClick={this.onReset}><FontAwesomeIcon icon={faCircleXmark}/> Cancel</button>
        <button disabled={!this.props.editable} type="submit" onClick={this.onSubmit}><FontAwesomeIcon icon={faArrowRight}/> Submit</button>
      </form>
    );
  }
}