import { Helper } from "./Helper";

export class Sport {
    readonly sportId: string = new Helper().getDateAsString(false);
    readonly name: string;
    
   constructor(name: string) {
    this.name = name;
   }

}
  