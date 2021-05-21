import Vue from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add([faSyncAlt, faPlus]);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
