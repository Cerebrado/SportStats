export class Model {
  History: Match[] = new Array<Match>();
  CurrentMatch: Match = new Match();
  Settings: Settings = new Settings();
  User: User = new User();
}

export class User {
  email: string;
  isLoggedIn: boolean;
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
  public Players: Player[];
  public SetScore: number[];
  public GameCounting: number;
  public GameScoreDisplay: string;
  constructor() {
    this.Players = new Array<Player>();
    this.SetScore = new Array<number>();
  }
}

export class Match {
  public Teams: Team[];
  public Finalized: boolean;
  public SetIndex: number;
  public ServiceIndex: number = 0;
  public Name: string;
  public PlayEventsList: PlayEvent[];

  private _date: Date;
  get Date(): Date {
    return this._date;
  }
  set Date(value: Date) {
    this._date = value;
    this.Name = this.getDateAsString(value);
  }

  constructor() {
    this._date = new Date();

    this.Teams = [new Team(), new Team()];
    this.PlayEventsList = new Array<PlayEvent>();
    this.SetIndex = 0;
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
