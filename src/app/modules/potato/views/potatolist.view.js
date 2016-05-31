import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';

import potatoListTemplate from '../templates/potatolist.hbs';

export default Marionette.ItemView.extend({
  tagName: 'ul',
  className: 'c-potato-list',
  template: potatoListTemplate,

  initialize(options) {
  	options = options || {};
  	this.initialScrollPosition = options.initialScrollPosition;
  	this.persistScrollPosition = options.persistScrollPosition;
  },

  serializeData() {
    return {'potatoes': this.collection.toJSON()};
  },

  onAttach() {
  	if (this.initialScrollPosition) {
  		this.el.scrollTop = this.initialScrollPosition;
  	}
  },

  onBeforeDestroy() {
  	if(this.persistScrollPosition) {
  		this.persistScrollPosition(this.el.scrollTop);
  	}
  }

});
