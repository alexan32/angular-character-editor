import { EventEmitter, Injectable } from '@angular/core';
import { characterMin, dnd5e } from '../models/characterTemplates';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  // object for handling character data
  characterHandler: CharacterDataHandler = new CharacterDataHandler(characterMin);

  private eventSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  characterEvent: Observable<any> = this.eventSubject.asObservable()

  getCharacterObservable(){
    return this.characterHandler.characterData$;
  }

  publishCharacterEvent(event:any){
    this.eventSubject.next(event);
  }

}

class CharacterDataHandler{

  characterData:any;
  characterDataSubject: BehaviorSubject<any>;
  characterData$:Observable<any>;

  constructor(characterData:any){
    this.characterData = characterData;
    this.characterDataSubject = new BehaviorSubject<any>(this.characterData);
    this.characterData$ = this.characterDataSubject.asObservable()
  }

  setFirstName(name:string){
    this.characterData.first = name;
    this.characterDataSubject.next(this.characterData);
  }

  setLastName(name:string){
    this.characterData.last = name;
    this.characterDataSubject.next(this.characterData);
  }

  overwriteData(characterData:any){
    console.log("overwriting character data")
    this.characterData = characterData;
    this.characterDataSubject.next(this.characterData);
  }

  deleteCounter(key:string){
    console.log("deleteing counter ", key);
    delete this.characterData.counters[key];
    this.characterDataSubject.next(this.characterData);
  }

  deleteComposite(key:string){
    console.log("deleting composite ", key)
    delete this.characterData.composites[key];
    this.characterDataSubject.next(this.characterData);
  }

  deleteRoll(key:string){
    console.log("deleting roll ", key)
    delete this.characterData.rolls[key];
    this.characterDataSubject.next(this.characterData);
  }

  addCounter(key:string, data:any){
    console.log("adding counter ", key, data);
    this.characterData.counters[key] = data;
    this.characterDataSubject.next(this.characterData);
  }

  addComposite(key:string, data:any){
    console.log("adding composite ", key, data);
    this.characterData.composites[key] = data;
    this.characterDataSubject.next(this.characterData);
  }

  addRoll(key:string, data:string){
    console.log("adding roll ", key, data);
    this.characterData.rolls[key] = data;
    this.characterDataSubject.next(this.characterData);
  }

  getCounter(key:string){
    return this.characterData.counters[key];
  }

  getRoll(key:string){
    return this.characterData.rolls[key];
  }

  getComposite(key:string){
    return this.characterData.composites[key];
  }
}
