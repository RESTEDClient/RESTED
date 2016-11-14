import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

/* eslint-disable import/prefer-default-export */
export function showChooseCollectionModal({ collections, setModalData }) {
  return new Promise((resolve, reject) => {
    let selectedIndex = 0;

    setModalData({
      title: 'Select collections',
      body: (
        <div>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>
              Which collection would you like to save this request to?
            </ControlLabel>
            <FormControl
              componentClass="select"
              onChange={e => { selectedIndex = e.target.value; }}
              autoFocus
            >
              {collections.map((collection, index) => (
                <option
                  value={index}
                  key={collection.get('id')}
                >
                  {collection.get('name')}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </div>
      ),
      visible: true,
      cancelClick: reject,
      actions: [{
        text: 'Save',
        click: () => resolve(selectedIndex),
      }],
    });
  });
}

