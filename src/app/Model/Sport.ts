import { Helper } from "./Helper";
import { Event } from "./Event";
import { Tournament } from "./Tournament";
import { Dictionary } from "./Dictionary";

export class Sport {
    readonly sportId: string = new Helper().getDateAsString(false);
    readonly name: string;
    readonly events: Event[] = []
   readonly tournaments: Tournament[] = []
    
   constructor(name: string) {
    this.name = name;
   }

}
  