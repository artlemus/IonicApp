import { Component } from "@angular/core";
import { DataService } from "../services/data.service";
import {formatDate } from '@angular/common';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  today: number = Date.now();;

  
  constructor(private data: DataService) {
    setInterval(() => {this.today = Date.now()}, 1);
  }

  getMessages() {
    console.log(this.data.getAllMessaged());
    return this.data.getAllMessaged();

  }

}

