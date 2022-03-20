import { Helper } from "./helper";

export class Event {
    eventId: string = new Helper().getGuid();
    short: string;
    long: string;
    value: number;
  
    constructor(short: string, long: string, value: number) {
      this.short = short;
      this.long = long;
      this.value = value;
    }
  }
  