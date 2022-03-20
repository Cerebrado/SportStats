import { Helper } from "./helper";

export class Player {
    playerId:string = new Helper().getGuid();
    nick: string;
    
    constructor(nick: string) {
      this.nick = nick;
    }
  }
  