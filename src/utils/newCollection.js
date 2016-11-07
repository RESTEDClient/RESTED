import Immutable from 'immutable';
import UUID from 'uuid-js';

 // Checks whether the collection name is taken
function isUnique(name, collections) {
  return collections.every(item => (
    item.name.trim() !== name.trim()
  ));
}

function createId() {
  if (process.env.NODE_ENV === 'test') {
    return 'test-id';
  }

  return UUID.create().toString();
}

/**
 * Creates a new collection, factoring in the names of
 * the collections that already exist
 */
export default function newCollection(collections) {
  let i = 0;
  let name;

  do {
    name = `Collection${(i ? ` ${i}` : '')}`;
    i += 1;
  } while (!isUnique(name, collections));

  return Immutable.fromJS({
    name,
    id: createId(),
    minimized: false,
    requests: [],
  });
}
