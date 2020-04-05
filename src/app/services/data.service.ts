import { Injectable } from "@angular/core";
import { Message } from "../models/message";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  allMessage: Message[] = [];

  public saveMessage(message) {
    this.allMessage.push(message);
  }

  public getAllMessaged() {
    return this.allMessage;
  }
}
