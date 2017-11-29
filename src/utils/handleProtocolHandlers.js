const handleHar = (store, har) => {
  const requests = fromHAR(JSON.parse(text));

  setModalData({
    title: 'Successfully parsed imports',
    body: (
      <SelectCollectionForm
        onChange={this.setSelectedCollection}
        collections={collections}
      />
    ),
    actions: [{
      text: 'Add to collection',
      click: () => {
        requests.forEach(request => (
          addRequest(Immutable.fromJS(request), selectedCollection)
        ));
        removeModal(); // Self destruct
      },
    }, {
      text: 'New collection',
      click: () => {
        addCollection(Immutable.fromJS(requests));
        removeModal(); // Self destruct
      },
    }],
  });
};

/** strip ext+foo:// prefix */
const getData = data => (
  data.startsWith('ext%2B')
    ? data.replace(/^ext.*%3A\/\//, '')
    : data
);

export default store => {
  if (!location.search.startsWith('?')) return;

  const parts = location.search.substring(1).split('&');
  const query = parts.reduce((result, part) => {
    const [key, value] = part.split('=');
    return {
      ...result,
      [key]: getData(value),
    };
  }, {});
  console.log('query', query);

  switch (query.action) {
    case 'importHar':
      return handleHar(store, query.har);
    default:
  }
};
