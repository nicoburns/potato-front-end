import $ from 'jquery';
import Backbone from 'backbone';

import RootRegion from 'root.region';

import PotatoListView  from './views/potatolist.view';
import PotatoDetailView  from './views/potatodetail.view';
import FlickrFeedCollection from './models/flickrfeed.collection'


export default Backbone.Router.extend({

  routes: {
    "": "list",
    "!/potato/:id": "detail"
  },


  // Allows a single collection to easily be shared between list and detail views,
  // and ensures that it is only fetched once per session.
  getPotatoList: function () {
    if (this.potatoListPromise) {
      return this.potatoListPromise;
    } else {
      const potatoList       = new FlickrFeedCollection({tags: 'potato'});
      this.potatoListPromise = potatoList.fetch().then(() => potatoList);
      return this.potatoListPromise;
    }
  },

  list: function () {
    this.getPotatoList()
      .then(potatoList => {
        const potatoListView = new PotatoListView({
          collection: potatoList,
          initialScrollPosition: this.scrollPosition,
          persistScrollPosition: (position) => {this.scrollPosition = position}
        });
        RootRegion.show(potatoListView);
      });
  },

  detail: function (id) {
    this.getPotatoList()
      .then(potatoList => potatoList.get(id))
      .then(potatoModel => {
        const potatoDetailView = new PotatoDetailView({model: potatoModel});
        RootRegion.show(potatoDetailView);
      });
  }

});
