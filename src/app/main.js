import $ from 'jquery';
import Backbone from 'backbone';

import PotatoRouter from './modules/potato/potato.router';

const potatoRouter = new PotatoRouter();

Backbone.history.start();
