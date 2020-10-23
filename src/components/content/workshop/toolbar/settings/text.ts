// create an optional interface
export default {
    options: [
      { 
        type: 'range',
        spec: {
          name: 'Size',
          default: 0,
          scale: [0, 100],
          smoothingDivisible: 4,
          cssProperty: 'fontSize'
        },
      },
      { 
        type: 'range',
        spec: {
          name: 'Width',
          default: 0,
          scale: [0, 100],
          smoothingDivisible: 4,
          cssProperty: 'borderWidth'
        },
        triggers: [
          {
            cssProperty: 'borderColor',
            defaultValue: 'black',
            conditions: [undefined],
          },
          {
            cssProperty: 'borderStyle',
            defaultValue: 'solid',
            conditions: [undefined, 'none', 'hidden'],
            selector: true,
          }
        ]
      },
      { 
        type: 'select',
        spec: {
          name: 'Style',
          options: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'],
          default: 'none',
          cssProperty: 'borderStyle'
        },
      },
      { 
        type: 'colorPicker',
        spec: {
          name: 'Color',
          default: 'black',
          cssProperty: 'color'
        },
      },
      { 
        type: 'inputDropdown',
        spec: {
          name: 'font',
          options: ['Poppins', 'Accordion', 'Lato', 'cursive', 'sans-serif', 'groove', 'ridge', 'inset', 'outset'],
          cssProperty: 'fontFamily'
        },
      }
    ]
  };
  