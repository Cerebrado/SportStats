export class Dictionary<T,U>
{
    key: T;
    value: U;

    readonly keys: T[] = new Array<T>();
    readonly values: U[] = new Array<U>();


    constructor(dictionary?: Dictionary<T,U>){
        if(typeof(dictionary) !== 'undefined'){
            this.keys = dictionary.keys;
            this.values = dictionary.values;
        }
    }

    has(key: T):boolean{
        return this.keys.indexOf(key) !== -1;
    }

    set(key:T, value: U){
        this.keys.push(key);
        this.values.push(value);
    }

    get(key:T): U {
        const idx = this.keys.indexOf(key);
        if(idx == -1)
            throw key + ' not found';
        return this.values[idx];
    }

    delete(key: T){
        const idx = this.keys.indexOf(key);
        if(idx == -1)
            throw key + ' not found';
        
        this.values.splice(idx, 1);
        this.keys.splice(idx, 1);
    }
}