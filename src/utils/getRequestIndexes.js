export default (id, collections) => {
  let result = null;

  collections.some(
    (collection, collectionIndex) => (
      collection.get('requests').some(
        (request, requestIndex) => {
          if (request.get('id') === id) {
            result = {
              collectionIndex,
              requestIndex,
            };
            return true;
          }
          return false;
        },
      )
    ),
  );

  return result;
};

