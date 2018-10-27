import { cleanPath, validatePath } from '../../utils/path';
import CollectionReference from './collection-reference';
import WriteBatch from './write-batch';
import getOrSetDataNode from '../../utils/get-or-set-data-node';
import validateReference from '../../utils/reference';

export default class Firestore {
  constructor(data) {
    this._data = data;
  }

  batch() {
    return new WriteBatch();
  }

  runTransaction(transFunc) {
    const batch = this.batch();
    batch.get = (doc => doc.get());
    return new Promise(((resolve, reject) => {
      Promise.resolve(transFunc(batch)).then((value) => {
        batch
          .commit()
          .then(() => {
            resolve(value);
          })
          .catch(reject);
      }).catch(reject);
    }));
  }

  collection(id) {
    return this._getReference(id, 'collection');
  }

  doc(id) {
    return this._getReference(id, 'doc');
  }

  settings(settings) {
    this._settings = settings;
  }

  clearData() {
    this._data = {};
  }

  refillData(data) {
    this._data = data;
  }

  _collection(id) {
    const data = getOrSetDataNode(this._data, '__collection__', id);

    return new CollectionReference(id, data, null, this);
  }

  _getReference(path, type) {
    validatePath(path);

    const cleanedPath = cleanPath(path);
    const nodes = cleanedPath.split('/');
    let ref = this;

    nodes.forEach((node, index) => {
      if (index % 2 === 0) {
        if (ref.batch) {
          ref = ref._collection(node);
        } else {
          ref = ref.collection(node);
        }
      } else {
        ref = ref.doc(node);
      }
    });

    validateReference(ref, type);

    return ref;
  }
}
