import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ChildCss } from '../../../../../../../interfaces/workshopComponent';

export const inheritedBaseChildCss: ChildCss[] = [
  {
    elementTag: 'div',
    childNumber: 1,
    inheritedCss: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: CSS_PROPERTY_VALUES.INHERIT,
    },
  },
];
