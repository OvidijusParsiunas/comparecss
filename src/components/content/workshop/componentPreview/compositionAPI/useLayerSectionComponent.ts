import { UseLayerSectionComponent } from '../../../../../interfaces/useLayerSectionComponent';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { Subcomponent } from '../../../../../interfaces/workshopComponent';

export default function useLayerSectionComponent(): UseLayerSectionComponent {

  const getStyleProperties = (subcomponent: Subcomponent, index: string): WorkshopComponentCss[] => {
    return [
      { order: index },
      subcomponent.seedComponent.type === COMPONENT_TYPES.ICON ? { pointerEvents: 'none' } : {},
    ];
  };

  return {
    getStyleProperties,
  };
}
