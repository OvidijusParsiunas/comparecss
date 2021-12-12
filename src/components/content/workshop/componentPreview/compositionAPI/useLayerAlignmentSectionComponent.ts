import { UseLayerAlignmentSectionComponent } from '../../../../../interfaces/useLayerAlignmentSectionComponent';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { Subcomponent } from '../../../../../interfaces/workshopComponent';
import useIconComponent from './useIconComponent';

export default function useLayerAlignmentSectionComponent(): UseLayerAlignmentSectionComponent {

  const useIconComponentAPI = useIconComponent();

  const getComponentStyleProperties = (subcomponent: Subcomponent, index: string): WorkshopComponentCss[] => {
    return [
      { order: index },
      useIconComponentAPI.isSVGIcon(subcomponent.seedComponent) ? { pointerEvents: 'none' } : {},
    ];
  };

  return {
    getComponentStyleProperties,
  };
}
