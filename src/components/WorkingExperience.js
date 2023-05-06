
import { Component } from "react";
import WorkComponent from "./WorkComponent";
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquarePen, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/WorkingExperience.css";

export default class WorkingExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      works: [{
        data: undefined,
        uuid: uniqid(),
        editable: true,
        count: 0
      }],
      counter: 0
    }

    this.onUpdateData     = this.onUpdateData.bind(this);
    this.onAddWorkItem    = this.onAddWorkItem.bind(this);
    this.onDeleteWorkItem = this.onDeleteWorkItem.bind(this);
    this.onEditWorkItem   = this.onEditWorkItem.bind(this);
    this.childCallables = null;
  }
  
  #doEditWorkItem(uuid, data = undefined, editable = undefined) {
    // Get shallow copy
    const newWorks = this.state.works.slice();
    const idx = newWorks.findIndex((value) => value.uuid === uuid);
    if (idx === -1) return;
    if (data) newWorks[idx].data = data;
    if (undefined !== editable) newWorks[idx].editable = editable;
    this.setState({works: newWorks});
    return newWorks;
  }
  
  #doUpdateParentState(works) {
    const data = [];
    works.forEach((w) => {
      if (w.data) data.push(w.data)
    });
    this.props.onUpdateData(this.props.keyUpdate, data);
  }

  setChildCallables = (callables) => {
    this.childCallables = callables;
  }

  onEditWorkItem(uuid) {
    this.#doEditWorkItem(uuid, undefined, true);
    this.childCallables.doEditForm();
  }

  onDeleteWorkItem(uuid) {
    const newWorks = this.state.works.filter((value) => value.uuid !== uuid);

    if (newWorks.length) {
      this.setState({works: newWorks});
    } else {
      /* Insert empty work */
      this.setState({
        works: [{
          data: undefined,
          uuid: uniqid(),
          editable: true,
          count: 0
        }]
      });
    }
    this.#doUpdateParentState(newWorks);
  }

  onAddWorkItem() {
    this.setState({counter: this.state.counter + 1});
    this.setState({works: [...this.state.works, { data: undefined, uuid: uniqid(), count: this.state.counter + 1, editable: true }]});
  }

  onUpdateData(uuid, newData) {
    const works = this.#doEditWorkItem(uuid, newData, false);
    this.#doUpdateParentState(works);
  }

  render() {
    const last = this.state.works.at(-1);
    const works = [];
    for(let i = 0; i < this.state.works.length; i+=1) {
      const work = this.state.works[i];
      const uuid = work.uuid;
      const divCtrlBtn = (
        <div className="edit-list-items-ctrl">
          <button disabled={!work.data} onClick={() => this.onDeleteWorkItem(uuid)}><FontAwesomeIcon icon={faDeleteLeft}/></button>
          <button disabled={!work.data} onClick={() => this.onEditWorkItem(uuid)}><FontAwesomeIcon icon={faSquarePen}/></button>
        </div>
      );
      works.push(
        <div key={uuid}>
          {divCtrlBtn}
          <WorkComponent uuid={uuid} editable={work.editable} setCallables={this.setChildCallables} onUpdateData={this.onUpdateData}/>
        </div>
      );
    }
    return (
      <div className="edit-container">
        <div className="edit-header">
          <p>Working Experience:</p>
        </div>
        <div className="list-items">{works}</div>
        <button disabled={!(last && last.data)} className="list-items-add" onClick={this.onAddWorkItem}><FontAwesomeIcon icon={faSquarePlus} size="lg"/> Add work</button>
      </div>
    );
  }
}