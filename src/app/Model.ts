export class Model {
  History: Match[] = new Array<Match>();
  CurrentMatch: Match | null ;
  Settings: Settings | null;
}

export class Settings {
  PlayersList: Player[] = new Array<Player>();
  PlayEventsList: PlayEvent[] = new Array<PlayEvent>();
}

export class PlayEvent {
  public Short: string;
  public Long: string;
  public Value: number;

  constructor(short: string, long: string, value: number) {
    this.Short = short;
    this.Long = long;
    this.Value = value;
  }
}

export class Player {
  public Nick: string;
  public Name: string;
  public ServiceOrder: number;
  public Stats: PlayEvent[];

  constructor(nick: string, name: string) {
    this.Nick = nick;
    this.Name = name;
    this.ServiceOrder = -1;
    this.Stats = new Array<PlayEvent>();
  }
}

export class Team {
  public Players: Player[] = new Array<Player>();
  public SetScore: number[] = new Array<number>();
  public GameCounting: number = 0;
  public GameScoreDisplay: string = '';
}

export class Match {
  public Teams: Team[] = [new Team(), new Team()]; 
  public Finalized: boolean = false;
  public SetIndex: number = 0;
  public ServiceIndex: number = 0;
  public Name: string = '';
  public PlayEventsList: PlayEvent[] = new Array<PlayEvent>();

  constructor() {
    this. Name = this.getDateAsString(new Date()); 
  }

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
