

let _sinon = require('sinon');

let _sinon2 = _interopRequireDefault(_sinon);

let _collectionReference = require('./firebase/firestore/collection-reference');

let _collectionReference2 = _interopRequireDefault(_collectionReference);

let _documentReference = require('./firebase/firestore/document-reference');

let _documentReference2 = _interopRequireDefault(_documentReference);

let _documentSnapshot = require('./firebase/firestore/document-snapshot');

let _documentSnapshot2 = _interopRequireDefault(_documentSnapshot);

let _fieldValue = require('./firebase/firestore/field-value');

let _fieldValue2 = _interopRequireDefault(_fieldValue);

let _firestore = require('./firebase/firestore');

let _firestore2 = _interopRequireDefault(_firestore);

let _ = require('./');

let _2 = _interopRequireDefault(_);

let _querySnapshot = require('./firebase/firestore/query-snapshot');

let _querySnapshot2 = _interopRequireDefault(_querySnapshot);

let _query = require('./firebase/firestore/query');

let _query2 = _interopRequireDefault(_query);

let _firebase = require('firebase');

let _firebase2 = _interopRequireDefault(_firebase);

let _fixtureData = require('./utils/test-helpers/fixture-data');

let _fixtureData2 = _interopRequireDefault(_fixtureData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { let gen = fn.apply(this, arguments); return new Promise(((resolve, reject) => { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); })); }; }

let mockFirebase;

QUnit.module('Unit | mock-cloud-firestore', (hooks) => {
  hooks.beforeEach(() => {
    mockFirebase = new _2.default((0, _fixtureData2.default)());
  });

  QUnit.module('CollectionReference', () => {
    QUnit.module('getter/setter: id', () => {
      QUnit.test('should return collection identifier', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').id;

        // Assert
        assert.equal(result, 'users');
      });
    });

    QUnit.module('getter/setter: firestore', () => {
      QUnit.test('should return the firestore the collection is in', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').firestore;

        // Assert
        assert.ok(result instanceof _firestore2.default);
      });
    });

    QUnit.module('getter/setter: parent', () => {
      QUnit.test('should return DocumentReference if this is a subcollection', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a').collection('friends').parent;

        // Assert
        assert.ok(result instanceof _documentReference2.default);
      });

      QUnit.test('should return null if there is no parent', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').parent;

        // Assert
        assert.equal(result, null);
      });
    });

    QUnit.module('function: add', () => {
      QUnit.test('should add a new document', (() => {
        let _ref = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const ref = yield db.collection('users').add({ username: 'new_user' });

          // Assert
          const snapshot = yield ref.get();

          assert.deepEqual(snapshot.data(), { username: 'new_user' });
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: doc', () => {
      QUnit.test('should return the document reference using an ID', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a');

        // Assert
        assert.ok(result instanceof _documentReference2.default);
      });

      QUnit.test('should return the document reference using a path', (assert) => {
        assert.expect(2);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a/friends/user_b');

        // Assert
        assert.ok(result instanceof _documentReference2.default);
        assert.equal(result.id, 'user_b');
      });

      QUnit.test('should throw an error when getting doc reference on an odd number of segment', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        try {
          // Act
          db.collection('users').doc('user_a/friends');
        } catch (error) {
          // Assert
          assert.equal(error.message, 'Invalid document reference. Document references must have an even number of segments, but users/user_a/friends has 3.');
        }
      });

      QUnit.test('should create document reference when not providing an ID', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc();

        // Assert
        assert.ok(result.id);
      });
    });

    QUnit.module('function: endAt', () => {
      QUnit.test('should return an instance of Query', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').orderBy('age').endAt(15);

        // Assert
        assert.ok(result instanceof _query2.default);
      });
    });

    QUnit.module('function: endBefore', () => {
      QUnit.test('should return an instance of Query', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').orderBy('age').endBefore(15);

        // Assert
        assert.ok(result instanceof _query2.default);
      });
    });

    QUnit.module('function: get', () => {
      QUnit.test('should return the query snapshot', (() => {
        let _ref2 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const result = yield db.collection('users').get();

          // Assert
          assert.ok(result instanceof _querySnapshot2.default);
        });

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: limit', () => {
      QUnit.test('should return an instance of Query', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').orderBy('age').limit(15);

        // Assert
        assert.ok(result instanceof _query2.default);
      });
    });

    QUnit.module('function: onSnapshot', () => {
      QUnit.test('should return a function for unsubscribing', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').onSnapshot(() => {});

        // Assert
        assert.ok(typeof result === 'function');
      });

      QUnit.test('should fire callback', (assert) => {
        assert.expect(1);

        // Arrange
        const done = assert.async();
        const db = mockFirebase.firestore();

        // Act
        db.collection('users').onSnapshot((snapshot) => {
          // Assert
          assert.ok(snapshot instanceof _querySnapshot2.default);
          done();
        });
      });
    });

    QUnit.module('function: orderBy', () => {
      QUnit.test('should return an instance of Query', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').orderBy('age');

        // Assert
        assert.ok(result instanceof _query2.default);
      });
    });

    QUnit.module('function: startAfter', () => {
      QUnit.test('should return an instance of Query', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').orderBy('age').startAfter(15);

        // Assert
        assert.ok(result instanceof _query2.default);
      });
    });

    QUnit.module('function: startAt', () => {
      QUnit.test('should return an instance of Query', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').orderBy('age').startAt(15);

        // Assert
        assert.ok(result instanceof _query2.default);
      });
    });

    QUnit.module('function: where', () => {
      QUnit.test('should return an instance of Query', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').orderBy('age').where('name', '==', 'Foo');

        // Assert
        assert.ok(result instanceof _query2.default);
      });
    });
  });

  QUnit.module('DocumentReference', () => {
    QUnit.module('getter/setter: id', () => {
      QUnit.test('should return document identifier', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a').id;

        // Assert
        assert.equal(result, 'user_a');
      });
    });

    QUnit.module('getter/setter: firestore', () => {
      QUnit.test('should return the firestore the document is in', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a').firestore;

        // Assert
        assert.ok(result instanceof _firestore2.default);
      });
    });

    QUnit.module('getter/setter: parent', () => {
      QUnit.test('should return CollectionReference of which the DocumentReference belongs to', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a').parent;

        // Assert
        assert.ok(result instanceof _collectionReference2.default);
      });
    });

    QUnit.module('function: collection', () => {
      QUnit.test('should return the collection reference of an ID', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a').collection('friends');

        // Assert
        assert.ok(result instanceof _collectionReference2.default);
      });

      QUnit.test('should return the collection reference of a path', (assert) => {
        assert.expect(2);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a').collection('friends/user_b/wew_so_deep');

        // Assert
        assert.ok(result instanceof _collectionReference2.default);
        assert.equal(result.id, 'wew_so_deep');
      });

      QUnit.test('should throw an error when getting collection reference on an even number of segment', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        try {
          // Act
          db.collection('users').doc('user_a').collection('friends/user_b');
        } catch (error) {
          // Assert
          assert.equal(error.message, 'Invalid collection reference. Collection references must have an odd number of segments, but users/user_a/friends/user_b has 4.');
        }
      });
    });

    QUnit.module('function: delete', () => {
      QUnit.test('should delete the document', (() => {
        let _ref3 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const ref = db.collection('users').doc('user_a');

          // Act
          yield ref.delete();

          // Assert
          const record = yield ref.get();

          assert.equal(record.exists, false);
        });

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      })());

      QUnit.test('should delete the document coming from a query', (() => {
        let _ref4 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const querySnapshot = yield db.collection('users').where('age', '==', 15).get();

          // Act
          querySnapshot.forEach((() => {
            let _ref5 = _asyncToGenerator(function* (docSnapshot) {
              yield docSnapshot.ref.delete();
            });

            return function (_x5) {
              return _ref5.apply(this, arguments);
            };
          })());

          // Assert
          const docSnapshot = yield db.collection('users').doc('user_a').get();

          assert.equal(docSnapshot.exists, false);
        });

        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: get', () => {
      QUnit.test('should return the document snapshot', (() => {
        let _ref6 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const result = yield db.collection('users').doc('user_a').get();

          // Assert
          assert.ok(result instanceof _documentSnapshot2.default);
        });

        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: onSnapshot', () => {
      QUnit.test('should return a function for unsubscribing', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').doc('user_a').onSnapshot(() => {});

        // Assert
        assert.ok(typeof result === 'function');
      });

      QUnit.test('should fire callback', (assert) => {
        assert.expect(1);

        // Arrange
        const done = assert.async();
        const db = mockFirebase.firestore();

        // Act
        db.collection('users').doc('user_a').onSnapshot((snapshot) => {
          // Assert
          assert.ok(snapshot instanceof _documentSnapshot2.default);
          done();
        });
      });
    });

    QUnit.module('function: set', () => {
      QUnit.test('should set the data using the default options when it exist', (() => {
        let _ref7 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();
          const ref = db.collection('users').doc('user_a');

          // Act
          yield ref.set({
            name: 'user_a',
            dad: db.collection('users').doc('user_b'),
            modifiedOn: _firebase2.default.firestore.FieldValue.serverTimestamp(),
          });

          // Assert
          const snapshot = yield ref.get();
          const { dad, modifiedOn, name } = snapshot.data();

          assert.deepEqual(dad, db.collection('users').doc('user_b'));
          assert.ok(modifiedOn.toDate() instanceof Date);
          assert.equal(name, 'user_a');
        });

        return function (_x7) {
          return _ref7.apply(this, arguments);
        };
      })());

      QUnit.test('should set the data using the default options when it does not exists', (() => {
        let _ref8 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();
          const ref = db.collection('users').doc('user_100');

          // Act
          yield ref.set({
            dad: db.collection('users').doc('user_b'),
            modifiedOn: _firebase2.default.firestore.FieldValue.serverTimestamp(),
            username: 'user_100',
          });

          // Assert
          const snapshot = yield ref.get();
          const { dad, modifiedOn, username } = snapshot.data();

          assert.deepEqual(dad, db.collection('users').doc('user_b'));
          assert.ok(modifiedOn.toDate() instanceof Date);
          assert.equal(username, 'user_100');
        });

        return function (_x8) {
          return _ref8.apply(this, arguments);
        };
      })());

      QUnit.test('should set the data using the merge option', (() => {
        let _ref9 = _asyncToGenerator(function* (assert) {
          assert.expect(7);

          // Arrange
          const db = mockFirebase.firestore();
          const ref = db.collection('users').doc('user_a');

          // Act
          yield ref.set({
            dad: db.collection('users').doc('user_b'),
            modifiedOn: _firebase2.default.firestore.FieldValue.serverTimestamp(),
            name: 'user_a',
          }, { merge: true });

          // Assert
          const snapshot = yield ref.get();
          const {
            address,
            age,
            createdOn,
            dad,
            modifiedOn,
            name,
            username,
          } = snapshot.data();

          assert.deepEqual(address, { home: 'San Francisco', work: 'Silicon Valley' });
          assert.equal(age, 15);
          assert.deepEqual(createdOn.toDate(), new Date('2017-01-01'));
          assert.deepEqual(dad, db.collection('users').doc('user_b'));
          assert.ok(modifiedOn.toDate() instanceof Date);
          assert.equal(name, 'user_a');
          assert.equal(username, 'user_a');
        });

        return function (_x9) {
          return _ref9.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: update', () => {
      QUnit.test('should update the data', (() => {
        let _ref10 = _asyncToGenerator(function* (assert) {
          assert.expect(9);

          // Arrange
          const db = mockFirebase.firestore();
          const ref = db.collection('users').doc('user_a');

          // Act
          yield ref.update({
            age: _firebase2.default.firestore.FieldValue.delete(),
            dad: db.collection('users').doc('user_b'),
            modifiedOn: _firebase2.default.firestore.FieldValue.serverTimestamp(),
            pinnedBooks: _firebase2.default.firestore.FieldValue.arrayUnion('book_100'),
            pinnedFoods: _firebase2.default.firestore.FieldValue.arrayRemove('food_1'),
            name: 'user_a',
          });

          // Assert
          const snapshot = yield ref.get();
          const {
            address,
            age,
            createdOn,
            dad,
            modifiedOn,
            name,
            pinnedBooks,
            pinnedFoods,
            username,
          } = snapshot.data();

          assert.deepEqual(address, { home: 'San Francisco', work: 'Silicon Valley' });
          assert.equal(age, undefined);
          assert.deepEqual(createdOn.toDate(), new Date('2017-01-01'));
          assert.deepEqual(dad, db.collection('users').doc('user_b'));
          assert.ok(modifiedOn.toDate() instanceof Date);
          assert.equal(name, 'user_a');
          assert.deepEqual(pinnedBooks, ['book_1', 'book_2', 'book_100']);
          assert.deepEqual(pinnedFoods, ['food_2']);
          assert.equal(username, 'user_a');
        });

        return function (_x10) {
          return _ref10.apply(this, arguments);
        };
      })());

      QUnit.test('should throw error when updating data that does not exist', (() => {
        let _ref11 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const ref = db.collection('users').doc('user_100');

          try {
            // Act
            yield ref.update({ name: 'user_100' });
          } catch (e) {
            // Assert
            assert.ok(true);
          }
        });

        return function (_x11) {
          return _ref11.apply(this, arguments);
        };
      })());
    });
  });

  QUnit.module('DocumentSnapshot', () => {
    QUnit.module('getter/setter: exists', () => {
      QUnit.test('should return true if data exists', (() => {
        let _ref12 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').get();

          // Act
          const result = snapshot.exists;

          // Assert
          assert.equal(result, true);
        });

        return function (_x12) {
          return _ref12.apply(this, arguments);
        };
      })());

      QUnit.test('should return false if data does not exists', (() => {
        let _ref13 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_100').get();

          // Act
          const result = snapshot.exists;

          // Assert
          assert.equal(result, false);
        });

        return function (_x13) {
          return _ref13.apply(this, arguments);
        };
      })());
    });

    QUnit.module('getter/setter: id', () => {
      QUnit.test('should return the identifier', (() => {
        let _ref14 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').get();

          // Act
          const result = snapshot.id;

          // Assert
          assert.equal(result, 'user_a');
        });

        return function (_x14) {
          return _ref14.apply(this, arguments);
        };
      })());
    });

    QUnit.module('getter/setter: ref', () => {
      QUnit.test('should return the DocumentReference', (() => {
        let _ref15 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').get();

          // Act
          const result = snapshot.ref;

          // Assert
          assert.ok(result instanceof _documentReference2.default);
        });

        return function (_x15) {
          return _ref15.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: get', () => {
      QUnit.test('should return the specific field', (() => {
        let _ref16 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').get();

          // Act
          const result = snapshot.get('age');

          // Assert
          assert.equal(result, 15);
        });

        return function (_x16) {
          return _ref16.apply(this, arguments);
        };
      })());

      QUnit.test('should return the reference type field', (() => {
        let _ref17 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').collection('friends').doc('user_b')
.get();

          // Act
          const reference = snapshot.get('reference');

          // Assert
          const referenceSnapshot = yield reference.get();
          const { age, createdOn, username } = referenceSnapshot.data();

          assert.equal(age, 10);
          assert.deepEqual(createdOn.toDate(), new Date('2017-01-01'));
          assert.equal(username, 'user_b');
        });

        return function (_x17) {
          return _ref17.apply(this, arguments);
        };
      })());

      QUnit.test('should return the specific field using dot notation', (() => {
        let _ref18 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').get();

          // Act
          const result = snapshot.get('address.home');

          // Assert
          assert.equal(result, 'San Francisco');
        });

        return function (_x18) {
          return _ref18.apply(this, arguments);
        };
      })());

      QUnit.test('should return undefined when field does not exist', (() => {
        let _ref19 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').get();

          // Act
          const result = snapshot.get('foobar');

          // Assert
          assert.equal(result, undefined);
        });

        return function (_x19) {
          return _ref19.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: data', () => {
      QUnit.test('should return the data', (() => {
        let _ref20 = _asyncToGenerator(function* (assert) {
          assert.expect(4);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').get();

          // Act
          const {
            address,
            age,
            createdOn,
            username,
          } = snapshot.data();

          // Assert
          assert.deepEqual(address, { home: 'San Francisco', work: 'Silicon Valley' });
          assert.equal(age, 15);
          assert.deepEqual(createdOn.toDate(), new Date('2017-01-01'));
          assert.equal(username, 'user_a');
        });

        return function (_x20) {
          return _ref20.apply(this, arguments);
        };
      })());

      QUnit.test('should return the data and match any reference type field appropriately', (() => {
        let _ref21 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_a').collection('friends').doc('user_b')
.get();

          // Act
          const { reference } = snapshot.data();

          // Assert
          const referenceSnapshot = yield reference.get();
          const { age, createdOn, username } = referenceSnapshot.data();

          QUnit.module('function: get', () => {
            QUnit.test('should return the document snapshot', async (assert) => {
              assert.expect(1);

              // Arrange
              const db = mockFirebase.firestore();

              // Act
              const result = await db.collection('users').doc('user_a').get();

              // Assert
              assert.ok(result instanceof _documentSnapshot2.default);
            });
          });

          QUnit.module('function: onSnapshot', () => {
            QUnit.test('should return a function for unsubscribing', (assert) => {
              assert.expect(1);

              // Arrange
              const db = mockFirebase.firestore();

              // Act
              const result = db.collection('users').doc('user_a').onSnapshot(() => {});

              // Assert
              assert.ok(typeof result === 'function');
            });

            QUnit.test('should fire callback', (assert) => {
              assert.expect(1);

              // Arrange
              const done = assert.async();
              const db = mockFirebase.firestore();

              // Act
              db.collection('users').doc('user_a').onSnapshot((snapshot) => {
                // Assert
                assert.ok(snapshot instanceof _documentSnapshot2.default);
                done();
              });
            });
          });

          QUnit.module('function: set', () => {
            QUnit.test('should set the data using the non-merge option', async (assert) => {
              assert.expect(8);

              // Arrange
              const db = mockFirebase.firestore();
              const ref = db.collection('users').doc('user_a');

              // Act
              await ref.set({
                'address.home': 'San Francisco',
                age: null,
                name: 'user_a',
                dad: db.collection('users').doc('user_b'),
                modifiedOn: _firebase2.default.firestore.FieldValue.serverTimestamp(),
                pinnedBooks: _firebase2.default.firestore.FieldValue.arrayUnion('book_100'),
                pinnedFoods: _firebase2.default.firestore.FieldValue.arrayRemove('food_1'),
              });

              // Assert
              const snapshot = await ref.get();
              const data = snapshot.data();

              assert.equal(Object.keys(data).length, 7);
              assert.equal(data['address.home'], 'San Francisco');
              assert.equal(data.age, null);
              assert.deepEqual(data.dad, db.collection('users').doc('user_b'));
              assert.ok(data.modifiedOn.toDate() instanceof Date);
              assert.deepEqual(data.pinnedBooks, ['book_100']);
              assert.deepEqual(data.pinnedFoods, []);
              assert.equal(data.name, 'user_a');
            });

            QUnit.test('should set the data using the merge option', async (assert) => {
              assert.expect(11);

              // Arrange
              const db = mockFirebase.firestore();
              const ref = db.collection('users').doc('user_a');

              // Act
              await ref.set({
                'address.home': 'San Francisco',
                name: 'user_a',
                dad: db.collection('users').doc('user_b'),
                modifiedOn: _firebase2.default.firestore.FieldValue.serverTimestamp(),
                pinnedBooks: _firebase2.default.firestore.FieldValue.arrayUnion('book_100'),
                pinnedFoods: _firebase2.default.firestore.FieldValue.arrayRemove('food_1'),
              }, { merge: true });

              // Assert
              const snapshot = await ref.get();
              const data = snapshot.data();

              assert.equal(Object.keys(data).length, 10);
              assert.deepEqual(data.address, { home: 'San Francisco', work: 'Silicon Valley' });
              assert.equal(data['address.home'], 'San Francisco');
              assert.equal(data.age, 15);
              assert.deepEqual(data.createdOn.toDate(), new Date('2017-01-01'));
              assert.deepEqual(data.dad, db.collection('users').doc('user_b'));
              assert.ok(data.modifiedOn.toDate() instanceof Date);
              assert.deepEqual(data.pinnedBooks, ['book_1', 'book_2', 'book_100']);
              assert.deepEqual(data.pinnedFoods, ['food_2']);
              assert.equal(data.name, 'user_a');
              assert.equal(data.username, 'user_a');
            });

            QUnit.test('should throw error when setting data with an undefined value', async (assert) => {
              assert.expect(1);

              // Arrange
              const db = mockFirebase.firestore();
              const ref = db.collection('users').doc('user_a');

              try {
                // Act
                await ref.set({ name: undefined });
              } catch (e) {
                // Assert
                assert.ok(true);
              }
            });

            QUnit.test('should throw error when setting data with a FieldValue.delete() value', async (assert) => {
              assert.expect(1);

              // Arrange
              const db = mockFirebase.firestore();
              const ref = db.collection('users').doc('user_a');

              try {
                // Act
                await ref.set({ name: _firebase2.default.firestore.FieldValue.delete() });
              } catch (e) {
                // Assert
                assert.ok(true);
              }
            });
          });

          QUnit.module('function: update', () => {
            QUnit.test('should update the data', async (assert) => {
              assert.expect(10);

              // Arrange
              const db = mockFirebase.firestore();
              const ref = db.collection('users').doc('user_a');

              // Act
              await ref.update({
                'address.work': 'Bay Area',
                'contact.mobile': 12345,
                age: _firebase2.default.firestore.FieldValue.delete(),
                dad: db.collection('users').doc('user_b'),
                modifiedOn: _firebase2.default.firestore.FieldValue.serverTimestamp(),
                pinnedBooks: _firebase2.default.firestore.FieldValue.arrayUnion('book_100'),
                pinnedFoods: _firebase2.default.firestore.FieldValue.arrayRemove('food_1'),
                name: 'user_a',
              });

              // Assert
              const snapshot = await ref.get();
              const {
                address,
                age,
                contact,
                createdOn,
                dad,
                modifiedOn,
                name,
                pinnedBooks,
                pinnedFoods,
                username,
              } = snapshot.data();

              assert.deepEqual(address, { home: 'San Francisco', work: 'Bay Area' });
              assert.equal(age, undefined);
              assert.deepEqual(contact, { mobile: 12345 });
              assert.deepEqual(createdOn.toDate(), new Date('2017-01-01'));
              assert.deepEqual(dad, db.collection('users').doc('user_b'));
              assert.ok(modifiedOn.toDate() instanceof Date);
              assert.equal(name, 'user_a');
              assert.deepEqual(pinnedBooks, ['book_1', 'book_2', 'book_100']);
              assert.deepEqual(pinnedFoods, ['food_2']);
              assert.equal(username, 'user_a');
            });

            QUnit.test('should throw error when updating data that does not exist', async (assert) => {
              assert.expect(1);

              // Arrange
              const db = mockFirebase.firestore();
              const ref = db.collection('users').doc('user_100');

              try {
                // Act
                await ref.update({ name: 'user_100' });
              } catch (e) {
                // Assert
                assert.ok(true);
              }
            });

            QUnit.test('should throw error when updating data with an undefined value', async (assert) => {
              assert.expect(1);

              // Arrange
              const db = mockFirebase.firestore();
              const ref = db.collection('users').doc('user_a');

              try {
                // Act
                await ref.update({ name: undefined });
              } catch (e) {
                // Assert
                assert.ok(true);
              }
            });
          });
        });

        return function (_x21) {
          return _ref21.apply(this, arguments);
        };
      })());

      QUnit.test('should return undefined when data does not exist', (() => {
        let _ref22 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').doc('user_100').get();

          // Act
          const result = snapshot.data();

          // Assert
          assert.equal(result, undefined);
        });

        return function (_x22) {
          return _ref22.apply(this, arguments);
        };
      })());
    });
  });

  QUnit.module('FieldValue', () => {
    QUnit.module('function: arrayUnion', () => {
      QUnit.test('should return an array union representation', (assert) => {
        assert.expect(1);

        // Act
        const result = mockFirebase.firestore.FieldValue.arrayUnion('foo', 'bar');

        // Assert
        assert.deepEqual(result, {
          _methodName: 'FieldValue.arrayUnion',
          _elements: ['foo', 'bar'],
        });
      });
    });

    QUnit.module('function: arrayRemove', () => {
      QUnit.test('should return an array union representation', (assert) => {
        assert.expect(1);

        // Act
        const result = mockFirebase.firestore.FieldValue.arrayRemove('foo', 'bar');

        // Assert
        assert.deepEqual(result, {
          _methodName: 'FieldValue.arrayRemove',
          _elements: ['foo', 'bar'],
        });
      });
    });

    QUnit.module('function: delete', () => {
      QUnit.test('should return a delete field representation', (assert) => {
        assert.expect(1);

        // Act
        const result = mockFirebase.firestore.FieldValue.delete();

        // Assert
        assert.deepEqual(result, { _methodName: 'FieldValue.delete' });
      });
    });

    QUnit.module('function: serverTimestamp', () => {
      QUnit.test('should return a server timestamp representation', (assert) => {
        assert.expect(1);

        // Act
        const result = mockFirebase.firestore.FieldValue.serverTimestamp();

        // Assert
        assert.deepEqual(result, { _methodName: 'FieldValue.serverTimestamp' });
      });
    });
  });

  QUnit.module('Firestore', () => {
    QUnit.module('static getter/setter: FieldValue', () => {
      QUnit.test('should return an instance of FieldValue', (assert) => {
        assert.expect(1);

        // Act
        const result = mockFirebase.firestore.FieldValue;

        // Assert
        assert.ok(result instanceof _fieldValue2.default);
      });
    });

    QUnit.module('function: collection', () => {
      QUnit.test('should return the collection reference using a path', (assert) => {
        assert.expect(2);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users/user_a/friends');

        // Assert
        assert.ok(result instanceof _collectionReference2.default);
        assert.equal(result.id, 'friends');
      });

      QUnit.test('should throw an error when getting collection reference on an even number of segment', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        try {
          // Act
          db.collection('users/user_a');
        } catch (error) {
          // Assert
          assert.equal(error.message, 'Invalid collection reference. Collection references must have an odd number of segments, but users/user_a has 2.');
        }
      });
    });

    QUnit.module('function: doc', () => {
      QUnit.test('should return the document reference using a path', (assert) => {
        assert.expect(2);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.doc('users/user_a');

        // Assert
        assert.ok(result instanceof _documentReference2.default);
        assert.equal(result.id, 'user_a');
      });

      QUnit.test('should throw an error when getting doc reference on an even number of segment', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        try {
          // Act
          db.doc('users/user_a/friends');
        } catch (error) {
          // Assert
          assert.equal(error.message, 'Invalid document reference. Document references must have an even number of segments, but users/user_a/friends has 3.');
        }
      });
    });
  });

  QUnit.module('QuerySnapshot', () => {
    QUnit.module('getter/setter: docs', () => {
      QUnit.test('should return the documents for the query snapshot', (() => {
        let _ref23 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').get();

          // Act
          const result = snapshot.docs;

          // Assert
          assert.equal(result[0].id, 'user_a');
          assert.equal(result[1].id, 'user_b');
          assert.equal(result[2].id, 'user_c');
        });

        return function (_x23) {
          return _ref23.apply(this, arguments);
        };
      })());
    });

    QUnit.module('getter/setter: empty', () => {
      QUnit.test('should return true when there are no documents', (() => {
        let _ref24 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('foobar').get();

          // Act
          const result = snapshot.empty;

          // Assert
          assert.equal(result, true);
        });

        return function (_x24) {
          return _ref24.apply(this, arguments);
        };
      })());

      QUnit.test('should return false when there are documents', (() => {
        let _ref25 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').get();

          // Act
          const result = snapshot.empty;

          // Assert
          assert.equal(result, false);
        });

        return function (_x25) {
          return _ref25.apply(this, arguments);
        };
      })());
    });

    QUnit.module('getter/setter: size', () => {
      QUnit.test('should return the number of documents for the query snapshot', (() => {
        let _ref26 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').get();

          // Act
          const result = snapshot.size;

          // Assert
          assert.equal(result, 3);
        });

        return function (_x26) {
          return _ref26.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: forEach', () => {
      QUnit.test('should fire callback per each data', (() => {
        let _ref27 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const stub = _sinon2.default.stub();
          const db = mockFirebase.firestore();
          const snapshot = yield db.collection('users').get();

          // Act
          snapshot.forEach(stub);

          // Assert
          assert.ok(stub.calledThrice);
        });

        return function (_x27) {
          return _ref27.apply(this, arguments);
        };
      })());
    });
  });

  QUnit.module('Query', () => {
    QUnit.module('getter/setter: firestore', () => {
      QUnit.test('should return the firestore the query is in', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').limit(1).firestore;

        // Assert
        assert.ok(result instanceof _firestore2.default);
      });
    });

    QUnit.module('function: endAt', () => {
      QUnit.test('should return documents satisfying the query', (() => {
        let _ref28 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const snapshot = yield db.collection('users').orderBy('age').endAt(15).get();

          // Assert
          assert.equal(snapshot.docs.length, 2);
          assert.equal(snapshot.docs[0].id, 'user_b');
          assert.equal(snapshot.docs[1].id, 'user_a');
        });

        return function (_x28) {
          return _ref28.apply(this, arguments);
        };
      })());

      QUnit.test('should error when not doing orderBy()', (() => {
        let _ref29 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();

          try {
            // Act
            yield db.collection('users').endAt(15).get();
          } catch (e) {
            // Assert
            assert.ok(true);
          }
        });

        return function (_x29) {
          return _ref29.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: endBefore', () => {
      QUnit.test('should return documents satisfying the query', (() => {
        let _ref30 = _asyncToGenerator(function* (assert) {
          assert.expect(2);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const snapshot = yield db.collection('users').orderBy('age').endBefore(15).get();

          // Assert
          assert.equal(snapshot.docs.length, 1);
          assert.equal(snapshot.docs[0].id, 'user_b');
        });

        return function (_x30) {
          return _ref30.apply(this, arguments);
        };
      })());

      QUnit.test('should error when not doing orderBy()', (() => {
        let _ref31 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();

          try {
            // Act
            yield db.collection('users').endBefore(15).get();
          } catch (e) {
            // Assert
            assert.ok(true);
          }
        });

        return function (_x31) {
          return _ref31.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: limit', () => {
      QUnit.test('should return documents satisfying the query', (() => {
        let _ref32 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const snapshot = yield db.collection('users').limit(2).get();

          // Assert
          assert.equal(snapshot.docs.length, 2);
          assert.equal(snapshot.docs[0].id, 'user_a');
          assert.equal(snapshot.docs[1].id, 'user_b');
        });

        return function (_x32) {
          return _ref32.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: onSnapshot', () => {
      QUnit.test('should return a function for unsubscribing', (assert) => {
        assert.expect(1);

        // Arrange
        const db = mockFirebase.firestore();

        // Act
        const result = db.collection('users').orderBy('age').onSnapshot(() => {});

        // Assert
        assert.ok(typeof result === 'function');
      });

      QUnit.test('should fire callback', (assert) => {
        assert.expect(1);

        // Arrange
        const done = assert.async();
        const db = mockFirebase.firestore();

        // Act
        db.collection('users').orderBy('age').onSnapshot((snapshot) => {
          // Assert
          assert.ok(snapshot instanceof _querySnapshot2.default);
          done();
        });
      });
    });

    QUnit.module('function: orderBy', () => {
      QUnit.test('should return documents satisfying the query', (() => {
        let _ref33 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const snapshot = yield db.collection('users').orderBy('age').get();

          // Assert
          assert.equal(snapshot.docs[0].id, 'user_b');
          assert.equal(snapshot.docs[1].id, 'user_a');
          assert.equal(snapshot.docs[2].id, 'user_c');
        });

        return function (_x33) {
          return _ref33.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: startAfter', () => {
      QUnit.test('should return documents satisfying the query', (() => {
        let _ref34 = _asyncToGenerator(function* (assert) {
          assert.expect(2);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const snapshot = yield db.collection('users').orderBy('age').startAfter(15).get();

          // Assert
          assert.equal(snapshot.docs.length, 1);
          assert.equal(snapshot.docs[0].id, 'user_c');
        });

        return function (_x34) {
          return _ref34.apply(this, arguments);
        };
      })());

      QUnit.test('should error when not doing orderBy()', (() => {
        let _ref35 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();

          try {
            // Act
            yield db.collection('users').startAfter(15).get();
          } catch (e) {
            // Assert
            assert.ok(true);
          }
        });

        return function (_x35) {
          return _ref35.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: startAt', () => {
      QUnit.test('should return documents satisfying the query', (() => {
        let _ref36 = _asyncToGenerator(function* (assert) {
          assert.expect(3);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const snapshot = yield db.collection('users').orderBy('age').startAt(15).get();

          // Assert
          assert.equal(snapshot.docs.length, 2);
          assert.equal(snapshot.docs[0].id, 'user_a');
          assert.equal(snapshot.docs[1].id, 'user_c');
        });

        return function (_x36) {
          return _ref36.apply(this, arguments);
        };
      })());

      QUnit.test('should error when not doing orderBy()', (() => {
        let _ref37 = _asyncToGenerator(function* (assert) {
          assert.expect(1);

          // Arrange
          const db = mockFirebase.firestore();

          try {
            // Act
            yield db.collection('users').startAt(15).get();
          } catch (e) {
            // Assert
            assert.ok(true);
          }
        });

        return function (_x37) {
          return _ref37.apply(this, arguments);
        };
      })());
    });

    QUnit.module('function: where', () => {
      QUnit.test('should return documents satisfying the query', (() => {
        let _ref38 = _asyncToGenerator(function* (assert) {
          assert.expect(2);

          // Arrange
          const db = mockFirebase.firestore();

          // Act
          const snapshot = yield db.collection('users').where('age', '==', 15).get();

          // Assert
          assert.equal(snapshot.docs.length, 1);
          assert.equal(snapshot.docs[0].id, 'user_a');
        });

        return function (_x38) {
          return _ref38.apply(this, arguments);
        };
      })());
    });
  });

  QUnit.module('WriteBatch', () => {
    QUnit.module('function: commit', () => {
      QUnit.test('should commit all of the writes in the write batch', (() => {
        let _ref39 = _asyncToGenerator(function* (assert) {
          assert.expect(7);

          // Arrange
          const db = mockFirebase.firestore();
          const batch = db.batch();
          const ref1 = db.collection('users').doc();
          const ref2 = db.collection('users').doc('user_a');
          const ref3 = db.collection('users').doc('user_b');
          const ref4 = db.collection('users').doc('user_100');

          batch.set(ref1, { username: 'new_user' });
          batch.delete(ref2);
          batch.update(ref3, { name: 'user-b' });
          batch.set(ref4, { username: 'user_100' });

          // Act
          yield batch.commit();

          // Assert
          const snapshot1 = yield ref1.get();
          const snapshot2 = yield ref2.get();
          const snapshot3 = yield ref3.get();
          const snapshot4 = yield ref4.get();

          assert.deepEqual(snapshot1.data(), { username: 'new_user' });
          assert.equal(snapshot2.exists, false);

          const {
            age: snapshot3Age,
            createdOn: snapshot3CreatedOn,
            name: snapshot3Name,
            username: snapshot3Username,
          } = snapshot3.data();

          assert.equal(snapshot3Age, 10);
          assert.deepEqual(snapshot3CreatedOn.toDate(), new Date('2017-01-01'));
          assert.equal(snapshot3Name, 'user-b');
          assert.equal(snapshot3Username, 'user_b');
          assert.deepEqual(snapshot4.data(), { username: 'user_100' });
        });

        return function (_x39) {
          return _ref39.apply(this, arguments);
        };
      })());
    });
  });
});
