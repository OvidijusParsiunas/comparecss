// create an optional interface
export default {
  options: [
    { 
      type: 'range',
      spec: {
        name: 'H-Offset',
        default: 0,
        scale: [-50, 50],
        smoothingDivisible: 1,
        partialCss: {
            position: 0,
            fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        },
        cssProperty: 'boxShadow'
      },
    },
    { 
      type: 'range',
      spec: {
        name: 'Y-Offset',
        default: 0,
        scale: [-50, 50],
        smoothingDivisible: 1,
        partialCss: {
          position: 1,
          fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        }, 
        cssProperty: 'boxShadow'
      },
    },
    { 
      type: 'range',
      spec: {
        name: 'Blur',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 1,
        partialCss: {
          position: 2,
          fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        }, 
        cssProperty: 'boxShadow'
      },
    },
    { 
      type: 'range',
      spec: {
        name: 'Spread',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 1,
        partialCss: {
          position: 3,
          fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        }, 
        cssProperty: 'boxShadow'
      },
    },
    { 
      type: 'colorPicker',
      spec: {
        name: 'Color',
        default: '#000000',
        partialCss: {
          position: 4,
          fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        }, 
        cssProperty: 'boxShadow'
      },
    }
  ]
};
  