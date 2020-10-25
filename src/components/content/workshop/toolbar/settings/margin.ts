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
        name: 'Top',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginTop'
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
        name: 'Right',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginRight'
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
        name: 'Bottom',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginBottom'
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
                cssProperty: 'marginLeft',
                value: '',
                defaultValue: 0,
              },
              {
                cssProperty: 'marginRight',
                value: '',
                defaultValue: 0,
              },
              {
                cssProperty: 'marginTop',
                value: '',
                defaultValue: 0,
              },
              {
                cssProperty: 'marginBottom',
                value: '',
                defaultValue: 0,
              },
            ],
          },
          {
            option: 'manual',
            newChanges: [
              {
                cssProperty: 'marginLeft',
                value: '0px',
                defaultValue: 0,
              },
              {
                cssProperty: 'marginRight',
                value: '0px',
                defaultValue: 0,
              },
              {
                cssProperty: 'marginTop',
                value: '0px',
                defaultValue: 0,
              },
              {
                cssProperty: 'marginBottom',
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
    