import { Helper } from "./Helper";
import { Event } from "./Event";
import { Tournament } from "./Tournament";
import { Dictionary } from "./Dictionary";

export class Sport {
    readonly sportId: string = new Helper().getDateAsString(false);
    readonly name: string;
    
   constructor(name: string) {
    this.name = name;
   }

}
  