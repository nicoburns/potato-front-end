import $ from 'jquery';
import Backbone from 'backbone';

import RootRegion from 'root.region';

import PotatoListView  from './views/potatolist.view';
import FlickrFeedCollection from './models/flickrfeed.collection'


export default Backbone.Router.extend({
  routes: {
    "": "list",
    "potato/:id": "detail"
  },

  list: function () {
    const potatoList = new FlickrFeedCollection({tags: 'potato'});
    const helloView = new PotatoListView({collection: potatoList});

    potatoList.fetch()
    .then(() => {
      RootRegion.show(helloView);
    })
    
  },

  detail: function () {

  }
});
