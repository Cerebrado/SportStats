export class Helper {

  constructor() { }
  
  private pad2(n: number) {
    return n < 10 ? '0' + n : n;
  }
  
  private pad3(n: number) {
    if(n < 10) return '00' + n;
    if(n < 100) return '0' + n;
    return  n;
  }
  
  private pad4(n: number) {
    if(n < 10) return '000' + n;
    if(n < 100) return '00' + n;
    if(n < 1000) return '0' + n;
    return  n;
  }
  
  
  private pad(n: number, toLength: number){
    if(toLength < 2) 
      throw ("Cannot pad to less than 2");
    
    if(n > 10**(toLength-1))
      throw ('the numnber' + n + ' is greather than the desired pad');
    
    for(let i = 1; i < toLength -1; i++){
      if(n < (10 ** i)) return '0'.repeat(toLength - i) + 'n';
    }
  
    return n;
  }
  
  
  getDateAsString(includeMiliseconds: boolean):string {
    let date: Date = new Date();
    let result =      
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
      this.pad2(date.getSeconds());
  
      if(includeMiliseconds)
        result = result + '.' +  this.pad3(date.getMilliseconds())

      return result;
    }
  
    getGuid(){
      return this.getDateAsString(true);
    }
  
  }
