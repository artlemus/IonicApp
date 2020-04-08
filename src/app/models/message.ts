export class Message {
    public text: string;
    public imageUrl: string;
    public from: string;
    public to: string;
    public createdOn: Date;


    currentDate = new Date();

    constructor() {
        this.to = "General";
    }

}