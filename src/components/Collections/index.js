import React from 'react';
import { Panel } from 'react-bootstrap';

function Titlebar() {
  return (
    <span>
      Add new collection
    </span>
  );
}

function CollectionTitle() {
  return (
    <h4 class="panel-title">
      <span data-ng-show="$parent.editing === collection.name"
        class="clearfix form-group form-group-sm">
        <span class="col-xs-10 row">
          <input class="form-control edit-collection-name"
            data-ng-model="updatedName"
            placeholder="Collection name"/>
        </span>
        <slidey-button class="update-collection pull-right"
          data-config="collectionUpdateConfig"
          data-click-event="updateCollectionName(collection, updatedName)">
        </slidey-button>
      </span>
      <span data-ng-hide="$parent.editing === collection.name">
        <span class="hoverhand"
          data-ng-style="{'font-style': collection.minimized ? 'italic' : 'normal'}"
          data-ng-click="minimizeCollection(collection, $index)">
          collection.name
        </span>
        <slidey-button class="update-collection"
          data-config="deleteCollectionConfig"
          data-click-event="deleteCollection(collection)">
        </slidey-button>
        <slidey-button class="update-collection"
          data-config="collectionOptionsConfig"
          data-click-event="toggleCollectionsOptions(collection)">
        </slidey-button>
      </span>
    </h4>
  );
}

export default function Collections() {
  // TODO Check lengths
  return (
    <Panel header={<Titlebar />}>
      <CollectionList />
      <div data-ng-show="collections.length === 0 || (collections.length === 1 &amp;&amp; collections[0].requests.length === 0)">
        <h5>
          No collected requests. Add by pressing "plus" in the top right of the request panel.
        </h5>
      </div>
    </Panel>
  );
}

