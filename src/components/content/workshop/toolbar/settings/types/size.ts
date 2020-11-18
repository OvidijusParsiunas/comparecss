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
      triggers: [
        {
          cssProperty: 'cssPlaceholder',
          defaultValue: 'manual',
          conditions: ['auto'],
          indirectCssPropertySelector: true, // should have a const for selector, indirectCssPropertySelector
        },
      ],
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
      triggers: [
        {
          cssProperty: 'cssPlaceholder',
          defaultValue: 'manual',
          conditions: ['auto'],
          indirectCssPropertySelector: true, // should have a const for selector, indirectCssPropertySelector
        },
      ],
    },
    { 
      type: 'select',
      spec: {
        name: 'Mode',
        options: ['auto', 'manual'],
        default: 'auto',
        triggers: [
          {
            option: 'auto',
            newChanges: [
              {
                cssProperty: 'width',
                value: '',
                defaultValue: 0,
              },
              {
                cssProperty: 'height',
                value: '',
                defaultValue: 0,
              }
            ],
          },
          {
            option: 'manual',
            newChanges: [
              {
                cssProperty: 'width',
                value: '0px',
                defaultValue: 0,
              },
              {
                cssProperty: 'height',
                value: '0px',
                defaultValue: 0,
              }
            ],
          }
        ]
      },
      cssPlaceholder: 'cssPlaceholder'
    },
  ]
};
    