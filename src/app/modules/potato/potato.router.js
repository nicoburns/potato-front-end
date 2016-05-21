import $ from 'jquery';
import Backbone from 'backbone';

import RootRegion from 'root.region';

import HelloView  from './views/hello';


export default Backbone.Router.extend({
  routes: {
    "": "list",
    "potato/:id": "detail"
  },

  list: function () {
    const helloView = new HelloView();
    RootRegion.show(helloView);
  },

  detail: function () {

  }
});
