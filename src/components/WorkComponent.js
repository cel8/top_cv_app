import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const patterns = {
  position: /^[a-z\s']{1,30}$/i,
  company: /^[a-z\s']{1,30}$/i,
  city: /^[a-zA-Z0-9\s,'-]*$/i,
  fromData: /^\d{2}-\d{4}$/i,
  toData: /^(\d{2}-\d{4}|present)$/i
};

export default class WorkComponent extends Component {
  constructor(props) {
    super(props);

    /* Internal state */
    this.state = {
      position: {
        text: '',
        valid: 'invalid'
      },
      company: {
        text: '',
        valid: 'invalid'
      },
      city: {
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
      displayWork: {
        position: '',
        company: '',
        city: '',
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
    this.setState({position: {text: '', valid: 'invalid'}});
    this.setState({company: {text: '', valid: 'invalid'}});
    this.setState({city: {text: '', valid: 'invalid'}});
    this.setState({fromData: {text: '', valid: 'invalid'}});
    this.setState({toData: {text: '', valid: 'invalid'}});
  }

  #setDisplayWorkState() {
    const { position, company, city, fromData, toData } = this.state;
    this.setState({
      displayWork: {
        position: position.text,
        company: company.text,
        city: city.text,
        fromData: fromData.text,
        toData: toData.text
      }
    })
    this.props.onUpdateData(this.props.uuid, {
      position: position.text,
      company: company.text,
      city: city.text,
      fromData: fromData.text,
      toData: toData.text
    });
  }

  #isFormValid() {
    const { position, company, city, fromData, toData } = this.state;
    const isValid = (input) => input.valid === 'valid';

    return isValid(position) && isValid(company) &&
      isValid(city) && isValid(fromData) && isValid(toData);
  }

  onChange(event) {
    let isValid = 'invalid';
    if (this.#validate(event.target.name, event.target)) {
      isValid = 'valid';
    }

    switch (event.target.name) {
      case 'position':
        this.setState({position: {text: event.target.value, valid: isValid}})
        break;
        case 'company':
          this.setState({company: {text: event.target.value, valid: isValid}})
          break;
        case 'city':
          this.setState({city: {text: event.target.value, valid: isValid}})
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
    const { position, company, city, fromData, toData } = this.state.displayWork;
    this.setState({position: {text: position, valid: 'valid'}});
    this.setState({company: {text: company, valid: 'valid'}});
    this.setState({city: {text: city, valid: 'valid'}});
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
    const { position, company, city, fromData, toData } = this.state;
    return (
      <form className="work-item-container">
        <label htmlFor="work-position">Position title</label>
        <input id="work-position" name="position" type="text" value={position.text} className={position.valid} onChange={this.onChange}></input>
        <label htmlFor="work-company">Company name</label>
        <input id="work-company" name="company" type="text" value={company.text} className={company.valid} onChange={this.onChange}></input>
        <label htmlFor="work-city">City</label>
        <input id="work-city" name="city" type="text" value={city.text} className={city.valid} onChange={this.onChange}></input>
        <label htmlFor="work-fromData">From (MM-YYYY):</label>
        <input id="work-fromData" name="fromData" type="text" value={fromData.text} className={fromData.valid} onChange={this.onChange}></input>
        <label htmlFor="work-toData">To (MM-YYYY or present):</label>
        <input id="work-toData" name="toData" type="text" value={toData.text} className={toData.valid} onChange={this.onChange}></input>
        <button disabled={!this.props.editable} type="submit" onClick={this.onSubmit}><FontAwesomeIcon icon={faArrowRight}/> Submit</button>
        <button disabled={!this.props.editable} onClick={this.onReset}><FontAwesomeIcon icon={faCircleXmark}/> Cancel</button>
      </form>
    );
  }
}