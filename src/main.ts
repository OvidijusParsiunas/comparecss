import BaseComponent from './components/content/workshop/componentPreview/BaseComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import addFontAwesomeIcons from './font-awesome';
import { createApp } from 'vue';
import App from './App.vue';

addFontAwesomeIcons();

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.component('base-component', BaseComponent)
.mount('#app');
