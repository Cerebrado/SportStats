import { Helper } from "./Helper";

export class Sport {
    readonly sportId: string = new Helper().getGuid();
    readonly name: string;
    
   constructor(name: string) {
    this.name = name;
   }

}
  