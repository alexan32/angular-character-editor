// generate a unique id. credit to some dude on stack overflow.
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function compositeToRollString(composite: any){
    let values:Array<string> = [];
    Object.keys(composite).forEach(key=>{
        values.push(composite[key])
    });
    return values.join(" + ");
}

export function characterToTableData(characterData:any){

    // Counters
    let counterData = characterData["counters"];
    let counters: Array<any> = [];
    Object.keys(counterData).forEach(key=>{
        counters.push(Object.assign({name: key, type:"counter"}, counterData[key]));
    });

    // Composites
    let compositeData = characterData["composites"];
    let composites: Array<any> = [];
    Object.keys(compositeData).forEach(key=>{
        composites.push({
            name: key,
            roll: compositeToRollString(compositeData[key]),
            type: "composite"
        });
    });

    // Rolls
    let rollData = characterData["rolls"];
    let rolls: Array<any> = [];
    Object.keys(rollData).forEach(key=>{
        rolls.push({
            name: key,
            roll: rollData[key],
            type: "roll"
        });
    });

    return {
        "counters": counters,
        "composites": composites,
        "rolls": rolls
    }
}