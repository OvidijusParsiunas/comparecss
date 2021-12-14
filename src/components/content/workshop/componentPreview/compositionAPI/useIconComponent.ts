import { DROPDOWN_ARROW_ICON_TYPES_TO_FONT_AWESOME_NAMES } from '../../../../../consts/dropdownArrowIcons';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { UseIconComponent } from '../../../../../interfaces/useIconComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { ICON_TYPES } from '../../../../../consts/iconTypes.enum';
import { Ref } from 'vue';

export default function useIconComponent(component?: Ref<WorkshopComponent>): UseIconComponent {

  const isIcon = (): boolean => {
    return component.value.type === COMPONENT_TYPES.ICON;
  }

  const isSVGIcon = (): boolean => {
    const { baseSubcomponent } = component.value;
    return baseSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.ICON && baseSubcomponent.customStaticFeatures?.icon.type === ICON_TYPES.BASIC;
  };

  const getSVGIconName = (): string => {
    if (isSVGIcon()) {
      const iconName = (component.value).baseSubcomponent.customStaticFeatures?.icon?.name;
      return DROPDOWN_ARROW_ICON_TYPES_TO_FONT_AWESOME_NAMES[iconName];
    }
    return null;
  }

  return {
    isIcon,
    isSVGIcon,
    getSVGIconName,
  };
}
