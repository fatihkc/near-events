import { Context, u128, ContractPromiseBatch, logging } from "near-sdk-as";
import { Event, events, PartialEvent } from "./model";
import { AccountId, Money, XCC_GAS, assert_self, assert_single_promise_success } from "../utils";

// export function donateById(id: u32, amount: u128): void {
//   const event = Event.findById(id);
//   event.donate(amount);
// }

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
    return Event.findByIdAndUpdate(id, updates);
  }

  deleteById(id: u32): void {
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

    logging.log("transfer complete")
  }

  private transfer(event: Event, donation: u128): void {
    this.assert_auction_owner(event);

    const to_self = Context.contractName;
    const to_organizer = ContractPromiseBatch.create(event.organizor);

    // transfer earnings to owner then confirm transfer complete
    const promise = to_organizer.transfer(event.donation);
    promise.then(to_self).function_call('on_transfer_complete', '{}', u128.Zero, XCC_GAS);
  }

  private assert_auction_owner(event: Event): void {
    assert(Context.sender == event.organizor, 'Only the owner of this auction may call this method');
  }

}