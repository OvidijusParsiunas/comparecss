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
        cssProperty: 'paddingLeft'
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
        cssProperty: 'paddingTop'
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
        cssProperty: 'paddingRight'
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
        cssProperty: 'paddingBottom'
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
                cssProperty: 'paddingLeft',
                value: '',
                defaultValue: 0,
              },
              {
                cssProperty: 'paddingRight',
                value: '',
                defaultValue: 0,
              },
              {
                cssProperty: 'paddingTop',
                value: '',
                defaultValue: 0,
              },
              {
                cssProperty: 'paddingBottom',
                value: '',
                defaultValue: 0,
              },
            ],
          },
          {
            option: 'manual',
            newChanges: [
              {
                cssProperty: 'paddingLeft',
                value: '0px',
                defaultValue: 0,
              },
              {
                cssProperty: 'paddingRight',
                value: '0px',
                defaultValue: 0,
              },
              {
                cssProperty: 'paddingTop',
                value: '0px',
                defaultValue: 0,
              },
              {
                cssProperty: 'paddingBottom',
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
    