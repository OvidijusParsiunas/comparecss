// create an optional interface
export default {
  options: [
    { 
      type: 'range',
      spec: {
        name: 'Width',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'width'
      },
    },
    { 
      type: 'range',
      spec: {
        name: 'Height',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'height'
      },
    },
    { 
      type: 'colorPicker',
      spec: {
        name: 'Color',
        default: '#000000',
        cssProperty: 'backgroundColor',
        unsetColorButtonAvailable: true,
      },
    }
  ]
};
