"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class WriteBatch {
  constructor() {
    this._writeBatch = { delete: [], set: [], update: [] };
  }

  commit() {
    for (const write of this._writeBatch.set) {
      write.ref.set(write.data, write.option);
    }

    for (const write of this._writeBatch.update) {
      write.ref.update(write.data);
    }

    for (const ref of this._writeBatch.delete) {
      ref.delete();
    }

    return Promise.resolve();
  }

  delete(ref) {
    this._writeBatch.delete.push(ref);
  }

  set(ref, data, option = {}) {
    this._writeBatch.set.push({ ref, data, option });
  }

  update(ref, data) {
    this._writeBatch.update.push({ ref, data });
  }

  getAll(listOfDocs) {
    return _asyncToGenerator(function* () {
      const docRefs = Array.from(listOfDocs);
      return Promise.all(docRefs.map(function (doc) {
        return doc.get();
      }));
    })();
  }
}
exports.default = WriteBatch;
module.exports = exports["default"];