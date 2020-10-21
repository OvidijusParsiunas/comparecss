// create an optional interface
export default {
  options: [
    { 
      type: 'range',
      spec: {
        name: 'H-Offset',
        default: 0,
        scale: [-50, 50],
        partialCss: {
            position: 0,
            fullDefaultValues: ['0px', '0px', '0px', '0px', 'black'],
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
        partialCss: {
          position: 1,
          fullDefaultValues: ['0px', '0px', '0px', '0px', 'black'],
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
        partialCss: {
          position: 2,
          fullDefaultValues: ['0px', '0px', '0px', '0px', 'black'],
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
        partialCss: {
          position: 3,
          fullDefaultValues: ['0px', '0px', '0px', '0px', 'black'],
        }, 
        cssProperty: 'boxShadow'
      },
    },
    { 
      type: 'colorPicker',
      spec: {
        name: 'Color',
        default: 'black',
        partialCss: {
          position: 4,
          fullDefaultValues: ['0px', '0px', '0px', '0px', 'black'],
        }, 
        cssProperty: 'boxShadow'
      },
    }
  ]
};
  