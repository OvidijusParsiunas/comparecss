import { ChildCss } from '../../../../../../../interfaces/workshopComponent';

export const inheritedLayerBaseChildCss: ChildCss[] = [
  {
    elementTag: 'div',
    childNumber: 1,
    inheritedCss: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 'inherit',
    },
  },
];
