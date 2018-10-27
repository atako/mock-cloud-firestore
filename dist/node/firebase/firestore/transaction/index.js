"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Transaction {
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
exports.default = Transaction;
module.exports = exports["default"];