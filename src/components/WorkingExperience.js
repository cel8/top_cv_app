
import { Component } from "react";
import WorkComponent from "./WorkComponent";
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquarePen, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

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
  }

  childCallables = null;
    
  setChildCallables = (callables) => {
     this.childCallables = callables;
  }
  
  #editWorkItem(uuid, data = undefined, editable = undefined) {
    // Get shallow copy
    const newWorks = this.state.works.slice();
    const idx = newWorks.findIndex((value) => value.uuid === uuid);
    if (idx === -1) return;
    if (data) newWorks[idx].data = data;
    if (undefined !== editable) newWorks[idx].editable = editable;
    this.setState({works: newWorks});
  }

  #editWorkItemSort(uuid, newData = undefined, editable = undefined) {
    const work = this.state.works.find((value) => value.uuid === uuid);
    const works = this.state.works.filter((value) => value.uuid !== uuid);
    const newEditable = (undefined !== editable) ? editable : work.editable;
    works.push({
      data: newData || work.data,
      uuid: work.uuid,
      editable: newEditable,
      count: work.count
    });
    const sortedWorks = works.sort((r1, r2) => (r1.count > r2.count) ? 1 : (r1.count < r2.count) ? -1 : 0);
    this.setState({works: sortedWorks});
  }

  onEditWorkItem(uuid) {
    this.#editWorkItem(uuid, undefined, true);
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
  }

  onAddWorkItem() {
    this.setState({counter: this.state.counter + 1});
    this.setState({works: [...this.state.works, { data: undefined, uuid: uniqid(), count: this.state.counter + 1, editable: true }]});
  }

  onUpdateData(uuid, newData) {
    this.#editWorkItem(uuid, newData, false);
  }

  render() {
    let btnAddWork;
    const last = this.state.works.at(-1);
    const works = [];
    for(let i = 0; i < this.state.works.length; i+=1) {
      const work = this.state.works[i];
      const uuid = work.uuid;
      const divCtrlBtn = (
        <div>
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
    if (last && last.data) {
      btnAddWork = <button onClick={this.onAddWorkItem}><FontAwesomeIcon icon={faSquarePlus}/> Add work</button>
    }
    return (
      <div>
        <div>{works}</div>
        {btnAddWork}
      </div>
    );
  }
}