import { BUTTON_JAVASCRIPT_CLASSES } from '../javascript/buttonJavaScriptClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum';
import { javaScriptContainer } from '../../toolbar/javascript/javascriptContainer';

// create an optional interface
export default {
  options: [
    {
      type: 'checkbox',
      spec: {
        name: 'Ripples',
        javascript: true,
        default: false,
        jsClassName: BUTTON_JAVASCRIPT_CLASSES.RIPPLES,
        componentId: javaScriptContainer[NEW_COMPONENT_TYPES.BUTTON].componentId,
      },
      // spec: {
      //   name: 'Material',
      //   default: false,
      //   conditionalStyle: {
      //     truthy: '',
      //     falsy: '',
      //   },
      //   downloadables: {
      //     jsFileContent: downloadableJS,
      //     cssFileContent: downloadableCSS,
      //   }
      // },
    },
  ]
};
