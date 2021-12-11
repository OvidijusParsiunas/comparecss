import { UseLayerAlignmentSectionComponent } from '../../../../../interfaces/useLayerAlignmentSectionComponent';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { Subcomponent } from '../../../../../interfaces/workshopComponent';

export default function useLayerAlignmentSectionComponent(): UseLayerAlignmentSectionComponent {

  const getComponentStyleProperties = (subcomponent: Subcomponent, index: string): WorkshopComponentCss[] => {
    return [
      { order: index },
      subcomponent.seedComponent.type === COMPONENT_TYPES.ICON ? { pointerEvents: 'none' } : {},
    ];
  };

  return {
    getComponentStyleProperties,
  };
}
