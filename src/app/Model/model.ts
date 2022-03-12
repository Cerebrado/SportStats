export class PlayEvent {
  Short: string;
  Long: string;
  Value: number;

  constructor(short: string, long: string, value: number) {
    this.Short = short;
    this.Long = long;
    this.Value = value;
  }
}

export class Player {
  Nick: string;
  Name: string;
  Stats: PlayEvent[];

  //public ServiceOrder: number = -1;

  constructor(nick: string, name: string) {
    this.Nick = nick;
    this.Name = name;
    this.Stats = new Array<PlayEvent>();
  }
}

export class Team {
  public Players: Player[] = [];
  //public SetScore: number[] = [];
  // public GameCounting: number = 0;
  // public GameScoreDisplay: string = '';
}

export class Match {
  public Teams: Team[] = [new Team(), new Team()]; 
  public Name: string = this.getDateAsString(new Date());

  // public Finalized: boolean = false;
  // public SetIndex: number = 0;
  // public ServiceIndex: number = 0;

  pad2(n: number) {
    return n < 10 ? '0' + n : n;
  }

  getDateAsString(date: Date) {
    return (
      date.getFullYear().toString() +
      '-' +
      this.pad2(date.getMonth() + 1) +
      '-' +
      this.pad2(date.getDate()) +
      ' ' +
      this.pad2(date.getHours()) +
      ':' +
      this.pad2(date.getMinutes()) +
      ':' +
      this.pad2(date.getSeconds())
    );
  }
}

export class Settings {
  PlayersList: Player[] = new Array<Player>();
  PlayEventsList: PlayEvent[] = new Array<PlayEvent>();
}

export class History {
  Matches: Match[] = new Array<Match>();
}

