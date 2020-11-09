import { InheritedCss } from '../../interfaces/inheritedCss';
import { WorkshopComponentCss } from '../../interfaces/workshopComponentCss';

export default {
  typeName: 'buttons',
  css: {
    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: 'middle',
    paddingLeft: '0.85em',
    paddingRight: '0.85em',
    fontSize: '14px',
    textAlign: 'center',
    fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
    transition: 'all 0.25s ease-out',
  } as WorkshopComponentCss,
} as InheritedCss;
