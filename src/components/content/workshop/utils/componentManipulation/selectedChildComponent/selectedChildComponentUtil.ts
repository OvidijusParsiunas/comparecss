import { SelectComponentContainer, SELECT_CHILD_COMPONENT_STYLE_OPTIONS } from '../../../../../../interfaces/selectedChildComponent';
import { SELECT_CHILD_COMPONENT_STYLE_DISABLED } from '../../../../../../consts/selectedChildComponent';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';

export class SelectedChildComponentUtil {

  public static getChildContainerSelectComponentObj(childComponent: WorkshopComponent): SelectComponentContainer {
    return childComponent.baseSubcomponent.customStaticFeatures.selectComponent.child.containerSelectComponentObj;
  }

  public static doesContainerHaveSelectedChildren(containerComponent: WorkshopComponent): boolean {
    return !!containerComponent.containerComponent.baseSubcomponent.customStaticFeatures.selectComponent.container.selectedComponent;
  }

  public static isSelectedAndStyleActive(childSubcomponent: Subcomponent): boolean {
    const { isSelected, containerSelectComponentObj } = childSubcomponent.customStaticFeatures?.selectComponent?.child || {};
    return isSelected && containerSelectComponentObj.activeStyle !== SELECT_CHILD_COMPONENT_STYLE_DISABLED;
  }

  public static getStyle(childSubcomponent: Subcomponent): SELECT_CHILD_COMPONENT_STYLE_OPTIONS {
    const { activeCssPseudoClassViaUserAction, activeCssPseudoClassesDropdownItem, seedComponent } = childSubcomponent;
    return (activeCssPseudoClassViaUserAction === CSS_PSEUDO_CLASSES.CLICK || activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.CLICK)
      ? CSS_PSEUDO_CLASSES.CLICK
      : SelectedChildComponentUtil.getChildContainerSelectComponentObj(seedComponent).activeStyle;
  }
}
