import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import * as pnp from "sp-pnp-js";

@Component({
  selector: 'my-app',
  templateUrl: 'https://localhost:4321/src/webparts/cewIncome/app/app.component.html',
  
})

export class AppComponent {

  states = [];
  UploadStates() {
       new pnp.Web("site").lists.getByTitle("ListTitle").items.get()
          .then((result) => {
             for (var item in result)
                this.states[item] = result[item]['Title'];
               
          });
       
  }

  stateCtrl: FormControl;
  filteredStates: any;

  constructor() {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name));
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gi').test(s)) : this.states;
  }

}