import { NearBindgen, near, call, view, initialize, UnorderedMap } from 'near-sdk-js'

import { assert } from './utils'
import { Donation, STORAGE_COST } from './model'

@NearBindgen({})
class DonationContract {
  beneficiary: string = "v1.faucet.nonofficial.testnet";

  /*1. LEARNER: Create a new map called "donations" using new UnorderedMap<>()
  int to string mapping */

  @initialize({ privateFunction: true })
  init({ beneficiary }: { beneficiary: string }) {
    //2. LEARNER: Assign benficiary using this.beneficiary
  }

  @call({ payableFunction: true })
  donate() {
    // Get who is calling the method and how much $NEAR they attached
    /* UNCOMMENT THIS BLOCK
    let donor = near.predecessorAccountId();
    */ 

    //3. LEARNER: Create a variable called "donationAmount" of type bigint and assign it 
    // with the "attachedDeposit" function available in thee near sdk
    // Typecast RHS to bigint
    
    /* UNCOMMENT THIS BLOCK
    let donatedSoFar = this.donations.get(donor, {defaultValue: BigInt(0)})
    let toTransfer = donationAmount;
    */

    // This is the user's first donation, lets register it, which increases storage
    /* UNCOMMENT THIS BLOCK
    if (donatedSoFar == BigInt(0)) {
      assert(donationAmount > STORAGE_COST, `Attach at least ${STORAGE_COST} yoctoNEAR`);

      // Subtract the storage cost to the amount to transfer
      toTransfer -= STORAGE_COST
    } */

    // Persist in storage the amount donated so far

    /* UNCOMMENT THIS BLOCK
    donatedSoFar += donationAmount


    //4. LEARNER: "set" the donations map of the donor - hint: you need to use "this"
    
    near.log(`Thank you ${donor} for donating ${donationAmount}! You donated a total of ${donatedSoFar}`);
    */

    // Send the money to the beneficiary
    /* UNCOMMENT THIS BLOCK
    const promise = near.promiseBatchCreate(this.beneficiary)
    near.promiseBatchActionTransfer(promise, toTransfer)
    */

    // Return the total amount donated so far
    //UNCOMMENT THIS: return donatedSoFar.toString()
  }

  /* TODO: 5. Write a function called "change_beneficiary"
  - Use the @call tag and make the function private
  - The argument is "beneficiary"
  - Assign beneficiary to the new value(Hint: Use "this")
  */


  /* TODO: 6. Write a function called "get_beneficiary"
  - Use the @view tag
  - No arguments but return parameter type should be added
  - Return beneficiary (Hint: Use "this")
  */

  @view({})
  number_of_donors(): number { return this.donations.length }

  @view({})
  get_donations({ from_index = 0, limit = 50 }: { from_index: number, limit: number }): Donation[] {
    let ret: Donation[] = []
    let end = Math.min(limit, this.donations.length)
    for (let i = from_index; i < end; i++) {
      const account_id: string = this.donations.keys.get(i) as string
      const donation: Donation = this.get_donation_for_account({ account_id })
      ret.push(donation)
    }
    return ret
  }

  @view({})
  get_donation_for_account({ account_id }: { account_id: string }): Donation {
    return {
      account_id,
      total_amount: this.donations.get(account_id).toString()
    }
  }
}