import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';

import potatoDetailTemplate from '../templates/potatodetail.hbs';

export default Marionette.ItemView.extend({
  template: potatoDetailTemplate,

  serializeData() {
    return this.model.toJSON();
  }

});
