import {map} from 'lodash';
import Backbone from 'backbone';
import FlickrFeedItem from './flickrfeeditem.model';

export default Backbone.Collection.extend({
	model: FlickrFeedItem,
	baseURL: './proxy/api.flickr.com/services/feeds/photos_public.gne',
	url: function () {
		return this.baseURL + '?' + map(this.flickr, (value, key) => key + '=' + value).join('&');
	},

	initialize: function (options) {

		this.flickr = {
			tagmode: 'all',
      		format: 'json',
		}

		options = options || {};
		if (options.tags) {
			this.flickr.tags = options.tags
		}
	},

	// Flickr API returns JSONP, so we force 'text' mime type to prevent
	// jQuery from automatically parsing it as JSON. We then implement our
	// own JSON parsing below.

	sync: function(method, model, options) {
	    options.dataType = 'text';
	    return Backbone.sync.apply(Backbone, arguments);
	},

	parse: function (response, options) {
		
		// Remove wrapper function from returned JSON string
		response = response
			.replace(/^jsonFlickrFeed\(/, '')
			.replace(/\)\r?\n?$/, '')

		// JSON.parse doesn't like escaped single quotes
		response = response.replace(/\\'/g, "'");

		response = JSON.parse(response);
		return response.items;
	}
})