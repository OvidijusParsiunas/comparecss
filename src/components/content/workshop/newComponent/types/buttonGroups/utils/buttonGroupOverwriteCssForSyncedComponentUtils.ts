import { AutoSyncedSiblingComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { OverwriteCssForSyncedComponent, SiblingChildComponentsAutoSynced } from '../../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { Subcomponent, WorkshopComponent, CustomCss } from '../../../../../../../interfaces/workshopComponent';
import { CustomCssUtils } from '../../../../utils/componentManipulation/utils/customCssUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import ComponentPreviewUtils from '../../../../componentPreview/utils/componentPreviewUtils';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ButtonGroupStylePropertiesUtils } from './buttonGroupStylePropertiesUtils';

export class ButtonGroupOverwriteCssForSyncedComponentUtils {

  private static getBoxShadowValue(subcomponent: Subcomponent, activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES): string {
    return subcomponent.customCss[activeCssPseudoClassesDropdownItem].boxShadow === CSS_PROPERTY_VALUES.INHERIT
      ? ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClassesDropdownItem, subcomponent.customCss, 'boxShadow')
      : subcomponent.customCss[activeCssPseudoClassesDropdownItem].boxShadow;
  }

  private static setBoxShadowWithoutOffsetAndBlur(subcomponent: Subcomponent, activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES,
      newDefaultProperties: WorkshopComponentCss): void {
    const boxShadowPropertyVal = ButtonGroupOverwriteCssForSyncedComponentUtils.getBoxShadowValue(subcomponent, activeCssPseudoClassesDropdownItem);
    if (boxShadowPropertyVal !== CSS_PROPERTY_VALUES.UNSET) {
      const boxShadowProps = boxShadowPropertyVal.split(' ');
      const shadowSpread = boxShadowProps[3];
      const shadowColor = boxShadowProps[4];
      newDefaultProperties.boxShadow = `0px 0px 0px ${shadowSpread} ${shadowColor}`;
    }
  }

  private static setOverwriteCssForSyncedComponentShadow(component: WorkshopComponent, overwriteCssForSyncedComponent: CustomCss): void {
    overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT].boxShadow = CSS_PROPERTY_VALUES.UNSET;
    ButtonGroupOverwriteCssForSyncedComponentUtils.setBoxShadowWithoutOffsetAndBlur(component.baseSubcomponent,
      CSS_PSEUDO_CLASSES.HOVER, overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.HOVER]);
    ButtonGroupOverwriteCssForSyncedComponentUtils.setBoxShadowWithoutOffsetAndBlur(component.baseSubcomponent,
      CSS_PSEUDO_CLASSES.CLICK, overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.CLICK]);
  }

  private static setOverwriteCssForSyncedComponentBorder(component: WorkshopComponent, overwriteCssForSyncedComponent: CustomCss): void {
    ButtonGroupStylePropertiesUtils.setBorderAndMarginCss(component, overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT]);
    overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.HOVER] = { ...overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT] };
    overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.CLICK] = { ...overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT] };
  }

  // used to prevent calculations from being executed for each button and when the user changes the button css pseudo class
  public static setOverwriteCssForSyncedComponent(component: WorkshopComponent, overwriteCssObjKey: keyof OverwriteCssForSyncedComponent): void {
    const overwriteCssForSyncedComponent = CustomCssUtils.createNewCustomCssObj();
    ButtonGroupOverwriteCssForSyncedComponentUtils.setOverwriteCssForSyncedComponentBorder(component, overwriteCssForSyncedComponent);
    ButtonGroupOverwriteCssForSyncedComponentUtils.setOverwriteCssForSyncedComponentShadow(component, overwriteCssForSyncedComponent);
    const siblingChildComponentsAutoSynced = AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(component);
    siblingChildComponentsAutoSynced[overwriteCssObjKey] = overwriteCssForSyncedComponent;
  }

  private static assignOverwriteCssForSyncedComponentToCustomCss(component: WorkshopComponent,
      siblingChildComponentsAutoSynced: SiblingChildComponentsAutoSynced): void {
    const { customCss } = component.baseSubcomponent;
    Object.keys(customCss).forEach((pseudoClass) => {
      Object.assign(customCss[pseudoClass], {
        ...customCss[pseudoClass],
        ...siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent[pseudoClass] });
    });  
  }

  public static unsetOverwriteCssForSyncedComponent(component: WorkshopComponent): void {
    const siblingChildComponentsAutoSynced = AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(component);
    if (siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent) {
      ButtonGroupOverwriteCssForSyncedComponentUtils.assignOverwriteCssForSyncedComponentToCustomCss(component, siblingChildComponentsAutoSynced);
      delete siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent; 
    }
  }
}
