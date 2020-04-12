import { Injectable } from "@angular/core";
import { Message } from "../models/message";
import { map } from  'rxjs/operators'
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';


@Injectable({
  providedIn: "root",
})
export class DataService {

  
  

  allMessages: Observable<Message[]>;

  //pipeline to firebase database
  messageCollection: AngularFirestoreCollection<Message>; 

  constructor(private fb: AngularFirestore) {
    // initialize connection to app firebase
    this.messageCollection = fb.collection<Message>('posts');
  }
// way to read data without date
  // retrieveMessagesFromDB() {
  //   this.allMessages = this.messageCollection.valueChanges();
  // }

  retrieveMessagesFromDB(){
    this.allMessages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(a => {
              let data = a.payload.doc.data();
              var d: any = data.createdOn; // <- firebase data format
              if(d){
                data.createdOn = new firestore.Timestamp(d.seconds, d.nanoseconds).toDate();
              }
              return {... data }
          })
      })
    );
  }


  public saveMessage(message) {

    var plain = Object.assign({}, message);
    this.messageCollection.add(plain);
  }

  public getAllMessages() {
    this.retrieveMessagesFromDB(); //subscribe to changes
    return this.allMessages;
  }
}
