import { DROPDOWN_ARROW_ICON_TYPES_TO_FONT_AWESOME_NAMES } from '../../../../../consts/dropdownArrowIcons';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { UseIconComponent } from '../../../../../interfaces/useIconComponent';
import { ICON_TYPES } from '../../../../../consts/iconTypes.enum';
import { Ref } from 'vue';

export default function useIconComponent(component?: Ref<WorkshopComponent>): UseIconComponent {

  const isSVGIcon = (componentArg?: WorkshopComponent): boolean => {
    const { baseSubcomponent } = componentArg || component.value;
    return baseSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.ICON && baseSubcomponent.customStaticFeatures?.icon.type === ICON_TYPES.BASIC;
  };

  const getSVGIconName = (componentArg?: WorkshopComponent): string => {
    if (isSVGIcon(componentArg)) {
      const iconName = (component.value || componentArg).baseSubcomponent.customStaticFeatures?.icon?.name;
      return DROPDOWN_ARROW_ICON_TYPES_TO_FONT_AWESOME_NAMES[iconName];
    }
    return null;
  }

  return {
    isSVGIcon,
    getSVGIconName,
  };
}
