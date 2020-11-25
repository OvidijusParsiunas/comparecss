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
      type: 'colorPicker',
      spec: {
        name: 'Color',
        default: '#000000',
        cssProperty: 'color'
      },
    },
  ]
};
