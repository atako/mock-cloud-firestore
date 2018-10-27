export default class Transaction {
  constructor(firestore) {
    this._firestore = firestore;
    this._writeBatch = firestore.writeBatch;
  }

  get(refOrQuery) {
    console.log(refOrQuery);
    return null;
  }

  // begin() {
  //   const request = {
  //     database: this._firestore.formattedName,
  //   };
  //   return this._firestore
  //     .request('beginTransaction', request, this._requestTag, ALLOW_RETRIES)
  //     .then((resp) => {
  //       this._transactionId = resp.transaction;
  //     });
  // }
}
