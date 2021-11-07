import { UseLayerSectionComponent } from '../../../../../interfaces/useLayerSectionComponent';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

export default function useLayerSectionComponent(): UseLayerSectionComponent {

  const getStyleProperties = (subcomponentProperties: SubcomponentProperties, index: string): WorkshopComponentCss[] => {
    return [
      { order: index },
      subcomponentProperties.seedComponent.type === COMPONENT_TYPES.ICON ? { pointerEvents: 'none' } : {},
    ];
  };

  return {
    getStyleProperties,
  };
}
