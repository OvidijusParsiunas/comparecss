// create an optional interface
export default {
  options: [
    { 
      type: 'range',
      spec: {
        name: 'Left',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginLeft'
      },
    },
    { 
      type: 'range',
      spec: {
        name: 'Top',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginTop'
      },
    },
    { 
      type: 'range',
      spec: {
        name: 'Right',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginRight'
      },
    },
    { 
      type: 'range',
      spec: {
        name: 'Bottom',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginBottom'
      },
    },
  ]
};
    