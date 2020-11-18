import { JAVASCRIPT_CLASSES } from '../../../../../../consts/javascriptClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { componentTypeToJavascriptClasses } from '../javascript/componentTypeToJavascriptClasses';

// create an optional interface
export default {
  options: [
    {
      type: 'checkbox',
      spec: {
        name: 'Ripples',
        javascript: true,
        default: false,
        jsClassName: JAVASCRIPT_CLASSES.RIPPLES,
        componentId: componentTypeToJavascriptClasses[NEW_COMPONENT_TYPES.BUTTON].componentId,
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
