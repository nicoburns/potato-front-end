import {map} from 'lodash';
import Backbone from 'backbone';

export default Backbone.Model.extend({

	parse: function (response, options) {

		// Parse photo id from link
		const parsedId = /([\d]*)\/?$/.exec(response.link);
		if (parsedId.length >= 2) response.id = parsedId[1];

		// Parse author name from format "email@domain (author name)"
		const parsedAuthor = /\(([^)]*)\)/.exec(response.author);
		if (parsedAuthor.length >= 2) response.author = parsedAuthor[1];

		// Unnest media property
		response.media = response.media.m;

		// Convert date string to Date object
		response.date_taken = new Date(response.date_taken);

		// Parse tags to array
		response.tags = response.tags.split(" ");

		return response;
	},

	// Extract human-readable information from Date objects
	dateToHash: function (date) {
		const suffixMap = {1: 'st', 2: 'nd', 3: 'rd'};
		const monthMap = {0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul',
			7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'};
		return {
			day:       date.getDate(),
			daySuffix: suffixMap[date.getDate().toString().slice(-1)] || 'th',
			month:     monthMap[date.getMonth()],
			year:      date.getFullYear(),
			hours:     date.getHours(),
			minutes:   date.getMinutes()
		};
	},

	toJSON: function () {
		const attributes = Backbone.Model.prototype.toJSON.apply(this);
		attributes.date_taken = this.dateToHash(this.get('date_taken'));
		return attributes;
	}
});