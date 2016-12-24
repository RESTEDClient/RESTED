import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import ModalBody from 'components/OptionsModal';

export function showOptionsModal({ setModalData }) {
  return new Promise((resolve, reject) => {
    setModalData({
      title: 'Options',
      body: <ModalBody />,
      visible: true,
      cancelClick: reject,
      actions: [{
        text: 'Save',
        click: resolve,
      }],
    });
  });
}

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

