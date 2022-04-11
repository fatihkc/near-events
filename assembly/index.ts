import { Event, PartialEvent } from "./model";

export function create(name: string,tag: string,detail: string): Event {
  return Event.addEvent(name,tag,detail);
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