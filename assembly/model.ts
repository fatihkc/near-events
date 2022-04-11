import { PersistentUnorderedMap, math } from "near-sdk-as";
export const events = new PersistentUnorderedMap<u32, Event>("events");

@nearBindgen
export class PartialEvent {
  detail: string;
}

@nearBindgen
export class Event {
  id: u32;
  name: string;
  tag: string;
  detail: string;

  constructor(name: string, tag: string, detail: string) {
    this.id = math.hash32<string>(name);
    this.name = name;
    this.tag = tag;
    this.detail = detail;
  }

  static addEvent(name: string,tag: string, detail: string): Event {
    const event = new Event(name, tag, detail);
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