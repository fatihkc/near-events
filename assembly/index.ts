import { Context } from "near-sdk-as";
import { Event, PartialEvent } from "./model";

export function create(name: string,tag: string,detail: string, IsDonatable: boolean): Event {
  const organizer = Context.sender;
  return Event.addEvent(organizer,name,tag,detail, IsDonatable);
}

export function getById(id: u32): Event {
  return Event.findById(id);
}

export function get(offset: u32, limit: u32 = 10): Event [] {
  return Event.find(offset, limit);
}

export function update(id: u32, updates: PartialEvent): Event {
  return Event.findByIdAndUpdate(id, updates);
} 

export function deleteById(id: u32): void {
  Event.findByIdAndDelete(id);
}
