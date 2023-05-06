
import { Component } from "react";
import EducationComponent from "./EducationComponent";
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquarePen, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

export default class EducationExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      educationItems: [{
        data: undefined,
        uuid: uniqid(),
        editable: true,
        count: 0
      }],
      counter: 0
    }

    this.onUpdateData           = this.onUpdateData.bind(this);
    this.onAddEducationItem     = this.onAddEducationItem.bind(this);
    this.onDeleteEducationItem  = this.onDeleteEducationItem.bind(this);
    this.onEditEducationItem    = this.onEditEducationItem.bind(this);
    this.childCallables         = null;
  }
  
  #doEditEducationItem(uuid, data = undefined, editable = undefined) {
    // Get shallow copy
    const newEducationItems = this.state.educationItems.slice();
    const idx = newEducationItems.findIndex((value) => value.uuid === uuid);
    if (idx === -1) return;
    if (data) newEducationItems[idx].data = data;
    if (undefined !== editable) newEducationItems[idx].editable = editable;
    this.setState({educationItems: newEducationItems});
    return newEducationItems;
  }
  
  #doUpdateParentState(educationItems) {
    const data = [];
    educationItems.forEach((item) => {
      if (item.data) data.push(item.data)
    });
    this.props.onUpdateData(this.props.keyUpdate, data);
  }

  setChildCallables = (callables) => {
    this.childCallables = callables;
  }

  onEditEducationItem(uuid) {
    this.#doEditEducationItem(uuid, undefined, true);
    this.childCallables.doEditForm();
  }

  onDeleteEducationItem(uuid) {
    const newEducationItems = this.state.educationItems.filter((value) => value.uuid !== uuid);

    if (newEducationItems.length) {
      this.setState({educationItems: newEducationItems});
    } else {
      /* Insert empty work */
      this.setState({
        educationItems: [{
          data: undefined,
          uuid: uniqid(),
          editable: true,
          count: 0
        }]
      });
    }
    this.#doUpdateParentState(newEducationItems);
  }

  onAddEducationItem() {
    this.setState({counter: this.state.counter + 1});
    this.setState({educationItems: [...this.state.educationItems, { data: undefined, uuid: uniqid(), count: this.state.counter + 1, editable: true }]});
  }

  onUpdateData(uuid, newData) {
    const educationItems = this.#doEditEducationItem(uuid, newData, false);
    this.#doUpdateParentState(educationItems);
  }

  render() {
    let btnAddEducation;
    const last = this.state.educationItems.at(-1);
    const educationItems = [];
    for(let i = 0; i < this.state.educationItems.length; i+=1) {
      const education = this.state.educationItems[i];
      const uuid = education.uuid;
      const divCtrlBtn = (
        <div>
          <button disabled={!education.data} onClick={() => this.onDeleteEducationItem(uuid)}><FontAwesomeIcon icon={faDeleteLeft}/></button>
          <button disabled={!education.data} onClick={() => this.onEditEducationItem(uuid)}><FontAwesomeIcon icon={faSquarePen}/></button>
        </div>
      );
      educationItems.push(
        <div key={uuid}>
          {divCtrlBtn}
          <EducationComponent uuid={uuid} editable={education.editable} setCallables={this.setChildCallables} onUpdateData={this.onUpdateData}/>
        </div>
      );
    }
    if (last && last.data) {
      btnAddEducation = <button onClick={this.onAddEducationItem}><FontAwesomeIcon icon={faSquarePlus}/> Add education</button>
    }
    return (
      <div>
        <div>{educationItems}</div>
        {btnAddEducation}
      </div>
    );
  }
}