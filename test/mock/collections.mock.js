import Immutable from 'immutable';

export default Immutable.fromJS({
  // TODO Replace mock data with collections: []
  collections: [{
    name: 'Collection',
    id: 'some-collection-UUID',
    minimized: true,
    requests: [{
      id: 'some-request-UUID1',
      url: 'www.foo.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData',
        },
      ],
      headers: [
        {
          name: 'Content-Type',
          value: 'angular/awesomeness',
        },
      ],
    }],
  }, {
    name: 'Collection 2',
    id: 'some-collection-UUID2',
    minimized: true,
    requests: [{
      id: 'some-request-UUID2',
      url: 'www.foo.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData',
        },
      ],
      headers: [
        {
          name: 'Content-Type',
          value: 'angular/awesomeness',
        },
      ],
    }, {
      id: 'some-request-UUID3',
      url: 'www.bar.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData',
        },
      ],
      headers: [
        {
          name: 'Content-Type',
          value: 'angular/awesomeness',
        },
      ],
    }, {
      id: 'some-request-UUID4',
      url: 'www.baz.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData',
        },
      ],
      headers: [
        {
          name: 'Content-Type',
          value: 'angular/awesomeness',
        },
      ],
    }],
  }],
});

