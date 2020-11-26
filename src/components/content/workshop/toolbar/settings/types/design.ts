import { JAVASCRIPT_CLASSES } from '../../../../../../consts/javascriptClasses.enum';

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
