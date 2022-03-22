import { Helper } from "./Helper";

export class Event {
    sportId:string;
    eventId: string = new Helper().getGuid();
    short: string;
    long: string;
    value: number;
  
    constructor(sportId:string, short: string, long: string, value: number) {
      this.sportId = sportId
      this.short = short;
      this.long = long;
      this.value = value;
    }
  }
  