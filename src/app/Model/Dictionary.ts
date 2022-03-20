export class Dictionary<T,U>
{
    key: T;
    value: U;

    private readonly _keys: T[] = new Array<T>();
    private readonly _values: U[] = new Array<U>();

    has(key: T):boolean{
        return this._keys.indexOf(key) !== -1;
    }

    add(key:T, value: U){
        this._keys.push(key);
        this._values.push(value);
    }

    get(key:T): U{
        const idx = this._keys.indexOf(key);
        if(idx == -1)
            throw key + 'not found';
        return this._values[idx];
    }

    keys(): T[]{
        return this._keys;
    }
    values(): U[]{
        return this._values;
    }
    


}