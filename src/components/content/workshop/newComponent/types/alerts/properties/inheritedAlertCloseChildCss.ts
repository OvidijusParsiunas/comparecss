import { ChildCss } from '../../../../../../../interfaces/workshopComponent';

export const inheritedAlertCloseChildCss: ChildCss[] = [
  {
    elementTag: 'div',
    childNumber: 2,
    inheritedCss: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      cursor: 'default !important',
    },
    nestedChildCss: [{
      elementTag: 'button',
      childNumber: 1,
      hasCustomCss: true,
      inheritedCss: {
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s ease-out',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        boxSizing: 'unset',
      },
      nestedChildCss: [{
        elementTag: 'div',
        childNumber: 1,
        inheritedCss: {
          display: 'table',
          pointerEvents: 'none',
          marginLeft: 'auto',
          marginRight: 'auto',
        }
      }]
    }]
  } 
];
