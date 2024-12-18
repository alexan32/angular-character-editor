export const characterMin = {
    "discordId": null,
    "first": "",
    "last": "",
    "meta": {},
    "functions": {},
    "articles": {},
    "counters": {},
    "rolls": {},
    "composites": {}
}

export const dnd5e = {
    "discordId": null,
    "first": "",
    "last": "",
    "meta": {},
    "functions": {
        "longrest": "|counter hp max; counter temphp min;",
        "cast": "$slot | counter $slot -1;  roll spell_attack;  roll spell_save;"
    },
    "articles": {},
    "counters": {
        "hp": {
            "max": "10",
            "min": "0",
            "total": "10"
        },
        "temphp": {
            "max": "999",
            "min": "0",
            "total": "0"
        },
        "strength_attribute": {
            "max": "20",
            "min": "0",
            "total": "8"
        },
        "dexterity_attribute": {
            "max": "20",
            "min": "0",
            "total": "8"
        },
        "constitution_attribute": {
            "max": "20",
            "min": "0",
            "total": "8"
        },
        "wisdom_attribute": {
            "max": "20",
            "min": "0",
            "total": "8"
        },
        "intelligence_attribute": {
            "max": "20",
            "min": "0",
            "total": "8"
        },
        "charisma_attribute": {
            "max": "20",
            "min": "0",
            "total": "8"
        },
        "level": {
            "max": "20",
            "min": "0",
            "total": "1"
        },
        "first": {
            "max": "4",
            "min": "0",
            "total": "3"
        },
        "second": {
            "max": "3",
            "min": "0",
            "total": "3"
        }
    },
    "rolls": {
        "str": "(strength - 10) / 2",
        "dex": "(dexterity - 10) / 2",
        "con": "(constitution - 10) / 2",
        "wis": "(wisdom - 10) / 2",
        "int": "(intelligence - 10) / 2",
        "cha": "(charisma - 10) / 2",
        "proficiencybonus": "((level - 1) / 4) + 2",
        "proficient": "proficiencybonus",
        "expert": "proficiencybonus * 2",
        "armorclass": "10 + dex",
        "prof": "proficient",
        "spell_save": "8 + cha + prof"
    },
    "composites": {
        "initiative": {
            "base": "1d20",
            "modifier": "dex",
            "bonus": "0"
        },
        "strength": {
            "attribute": "strength_attribute",
            "bonus": "0"
        },
        "dexterity": {
            "attribute": "dexterity_attribute",
            "bonus": "0"
        },
        "constitution": {
            "attribute": "constitution_attribute",
            "bonus": "0"
        },
        "wisdom": {
            "attribute": "wisdom_attribute",
            "bonus": "0"
        },
        "intelligence": {
            "attribute": "intelligence_attribute",
            "bonus": "0"
        },
        "charisma": {
            "attribute": "charisma_attribute",
            "bonus": "0"
        },
        "strength_check": {
            "base": "1d20",
            "modifier": "str"
        },
        "strength_save": {
            "base": "1d20",
            "modifier": "str",
            "proficiency": "0",
            "bonus": "0"
        },
        "dexterity_check": {
            "base": "1d20",
            "modifier": "dex"
        },
        "dexterity_save": {
            "base": "1d20",
            "modifier": "dex",
            "proficiency": "0",
            "bonus": "0"
        },
        "constitution_check": {
            "base": "1d20",
            "modifier": "dex"
        },
        "constitution_save": {
            "base": "1d20",
            "modifier": "dex",
            "proficiency": "0",
            "bonus": "0"
        },
        "wisdom_check": {
            "base": "1d20",
            "modifier": "wis"
        },
        "wisdom_save": {
            "base": "1d20",
            "modifier": "wis",
            "proficiency": "0",
            "bonus": "0"
        },
        "intelligence_check": {
            "base": "1d20",
            "modifier": "int"
        },
        "intelligence_save": {
            "base": "1d20",
            "modifier": "int",
            "proficiency": "0",
            "bonus": "0"
        },
        "charisma_check": {
            "base": "1d20",
            "modifier": "cha"
        },
        "charisma_save": {
            "base": "1d20",
            "modifier": "cha",
            "proficiency": "0",
            "bonus": "0"
        },
        "athletics": {
            "base": "1d20",
            "modifier": "str",
            "proficiency": "0",
            "bonus": "0"
        },
        "sleight_of_hand": {
            "base": "1d20",
            "modifier": "dex",
            "proficiency": "0",
            "bonus": "0"
        },
        "stealth": {
            "base": "1d20",
            "modifier": "dex",
            "proficiency": "0",
            "bonus": "0"
        },
        "theivestools": {
            "base": "1d20",
            "modifier": "dex",
            "proficiency": "0",
            "bonus": "0"
        },
        "arcana": {
            "base": "1d20",
            "modifier": "int",
            "proficiency": "0",
            "bonus": "0"
        },
        "history": {
            "base": "1d20",
            "modifier": "int",
            "proficiency": "0",
            "bonus": "0"
        },
        "investigation": {
            "base": "1d20",
            "modifier": "int",
            "proficiency": "0",
            "bonus": "0"
        },
        "nature": {
            "base": "1d20",
            "modifier": "int",
            "proficiency": "0",
            "bonus": "0"
        },
        "religion": {
            "base": "1d20",
            "modifier": "int",
            "proficiency": "0",
            "bonus": "0"
        },
        "animal_handling": {
            "base": "1d20",
            "modifier": "wis",
            "proficiency": "0",
            "bonus": "0"
        },
        "insight": {
            "base": "1d20",
            "modifier": "wis",
            "proficiency": "0",
            "bonus": "0"
        },
        "medicine": {
            "base": "1d20",
            "modifier": "wis",
            "proficiency": "0",
            "bonus": "0"
        },
        "perception": {
            "base": "1d20",
            "modifier": "wis",
            "proficiency": "0",
            "bonus": "0"
        },
        "survival": {
            "base": "1d20",
            "modifier": "wis",
            "proficiency": "0",
            "bonus": "0"
        },
        "deception": {
            "base": "1d20",
            "modifier": "cha",
            "proficiency": "0",
            "bonus": "0"
        },
        "intimidation": {
            "base": "1d20",
            "modifier": "cha",
            "proficiency": "0",
            "bonus": "0"
        },
        "performance": {
            "base": "1d20",
            "modifier": "cha",
            "proficiency": "0",
            "bonus": "0"
        },
        "persuasion": {
            "base": "1d20",
            "modifier": "cha",
            "proficiency": "0",
            "bonus": "0"
        },
        "acrobatics": {
            "base": "1d20",
            "modifier": "dex",
            "proficiency": "0",
            "bonus": "0"
        },
        "spell_attack": {
            "base": "1d20",
            "modifier": "cha",
            "proficiency": "prof",
            "bonus": "0"
        }
    }
}

// export class CharacterDataHandler{

//     characterData:any;

//     constructor(characterData:any){
//         this.characterData = characterData;
//     }

//     deleteCounter(key:string){
//         console.log("deleteing counter ", key);
//         delete this.characterData.counters[key];
//     }

//     deleteComposite(key:string){
//         delete this.characterData.composites[key];
//     }

//     deleteRoll(key:string){
//         delete this.characterData.rolls[key];
//     }

//     addCounter(key:string, data:any){
//         console.log("adding counter ", key, data);
//         this.characterData.counters[key] = data;
//     }

//     addComposite(key:string, data:any){
//         this.characterData.composites[key] = data;
//     }

//     addRoll(key:string, data:string){
//         this.characterData.rolls[key] = data;
//     }

//     getCounter(key:string){
//         return this.characterData.counters[key];
//     }

//     getRoll(key:string){
//         return this.characterData.rolls[key];
//     }

//     getComposite(key:string){
//         return this.characterData.composites[key];
//     }
// }