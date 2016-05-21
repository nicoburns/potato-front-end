import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';

import potatoListTemplate from '../templates/potatolist.hbs';

export default Marionette.ItemView.extend({

  template: potatoListTemplate,

  serializeData() {
    return {'potatoes': this.collection.toJSON()};
  }

});
