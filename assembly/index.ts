import { Context, u128, ContractPromiseBatch, logging } from "near-sdk-as";
import { Event, events, PartialEvent } from "./model";
import { AccountId, Money, XCC_GAS, assert_self, assert_single_promise_success } from "../utils";

export class Events {
  create(name: string,tag: string,detail: string, IsDonatable: boolean): Event {
    const organizer = Context.sender;
    return Event.addEvent(organizer,name,tag,detail, IsDonatable);
  }

  getById(id: u32): Event {
    return Event.findById(id);
  }

  get(offset: u32, limit: u32 = 10): Event [] {
    return Event.find(offset, limit);
  }

  update(id: u32, updates: PartialEvent): Event {
    const event = Event.findById(id);
    this.assert_organizer(event);
    return Event.findByIdAndUpdate(id, updates);
  }

  deleteById(id: u32): void {
    const event = Event.findById(id);
    this.assert_organizer(event);
    Event.findByIdAndDelete(id);
  }

  donate(id: u32, amount: u128): void {
    const event = Event.findById(id);
    this.transfer(event,amount);
  }

  @mutateState()
  on_transfer_complete(): void {
    assert_self()
    assert_single_promise_success()
    logging.log("transfer completed succesfully")
  }

  private transfer(event: Event, donation: u128): void {
    this.assert_donatable(event);
    event.donation = donation;
    const to_self = Context.contractName;
    const to_organizer = ContractPromiseBatch.create(event.organizor);
    const promise = to_organizer.transfer(event.donation);
    promise.then(to_self).function_call('on_transfer_complete', '{}', u128.Zero, XCC_GAS);
  }

  private assert_organizer(event: Event): void {
    assert(Context.sender == event.organizor, 'Only the organizer may call this method');
  }

  private assert_donatable(event: Event): void {
    assert(event.IsDonatable, 'This event is not donatable');
  }

}