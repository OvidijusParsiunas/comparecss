import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SelectComponentContainer } from '../../../../../../interfaces/selectedChildComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';

export class SelectedChildComponentUtil {

  public static getChildContainerSelectComponentObj(childComponent: WorkshopComponent): SelectComponentContainer {
    return childComponent.baseSubcomponent.customStaticFeatures.selectComponent.child.containerSelectComponentObj;
  }

  public static isSelected(baseSubcomponent: Subcomponent): boolean {
    return baseSubcomponent.customStaticFeatures?.selectComponent?.child?.isSelected;
  }

  public static doesContainerHaveSelectedChildren(component: WorkshopComponent): boolean {
    return !!component.containerComponent.baseSubcomponent.customStaticFeatures.selectComponent.container.selectedComponent;
  }

  public static getActivePseudoClass(subcomponent: Subcomponent): CSS_PSEUDO_CLASSES {
    const { activeCssPseudoClassViaUserAction, activeCssPseudoClassesDropdownItem, seedComponent } = subcomponent;
    return (activeCssPseudoClassViaUserAction === CSS_PSEUDO_CLASSES.CLICK || activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.CLICK)
      ? CSS_PSEUDO_CLASSES.CLICK
      : SelectedChildComponentUtil.getChildContainerSelectComponentObj(seedComponent).activeCssPseudoClass;
  }
}
