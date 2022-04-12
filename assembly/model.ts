import { Context, PersistentUnorderedMap, math, context } from "near-sdk-as";
import { AccountId } from "../utils";
export const events = new PersistentUnorderedMap<u32, Event>("events");

@nearBindgen
export class PartialEvent {
  detail: string;
}

@nearBindgen
export class Event {
  organizor: AccountId = context.sender;
  id: u32;
  name: string;
  tag: string;
  detail: string;
  IsDonatable: boolean;

  constructor(organizor: AccountId, name: string, tag: string, detail: string, IsDonatable: boolean) {
    this.organizor = this.organizor;
    this.id = math.hash32<string>(name);
    this.name = name;
    this.tag = tag;
    this.detail = detail;
    this.IsDonatable = IsDonatable;
  }

  static addEvent(organizor: AccountId, name: string,tag: string, detail: string, IsDonatable: boolean ): Event {
    const event = new Event(organizor, name, tag, detail, IsDonatable);
    events.set(event.id, event);
    return event;
  }

  static findById(id: u32): Event {
    return events.getSome(id);
  }

  static find(offset: u32, limit: u32): Event[] {
    return events.values(offset, offset + limit);
  } 

  static findByIdAndUpdate(id: u32, partial: PartialEvent): Event {
    const event = this.findById(id);

    event.detail = partial.detail;
    events.set(id, event);
    return event;
  }

  static findByIdAndDelete(id: u32): void {
    events.delete(id);
  }

}