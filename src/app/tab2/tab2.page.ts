import { Component } from "@angular/core";
import { Message } from "../models/message";
import { SharedService } from "../services/shared.service";
import { DataService } from "../services/data.service";
import { Friend } from '../models/friends';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  message: Message = new Message();
  myFriends: Friend[] = [];

  constructor(private shared: SharedService, private data: DataService) {
    this.data.getAllFriends().subscribe(list => {
      //!: this list contains all friends from database
      // this.myFriends = list;
      this.myFriends = [];
      for (let i = 0; i < list.length; i++){
        var f = list[i];
        if (f.belongsTo == this.shared.userName) {
          this.myFriends.push(f);
        }
      }
    });
  }

  onPost() {
    this.message.from = this.shared.userName;
    this.message.createdOn = new Date();
    this.data.saveMessage(this.message);
  // clear form
    this.message=new Message();
  }
}
