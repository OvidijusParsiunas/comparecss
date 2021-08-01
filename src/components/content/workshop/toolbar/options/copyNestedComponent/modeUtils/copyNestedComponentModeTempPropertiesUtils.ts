import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';

export class CopyNestedComponentModeTempPropertiesUtils {
  
  private static moveCustomPropertiesToTempProperties(activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    const activeSubcomponent = activeComponentSubcomponents[activeComponentSubcomponentName];
    activeSubcomponent.tempOriginalCustomProperties = {
      customCss: activeSubcomponent.customCss,
      customFeatures: activeSubcomponent.customFeatures,
    };
  }

  private static copyTargetSubcomponent(subcomponentsToBeCopied: Subcomponents, subcomponentToBeCopiedName: string,
      activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    const activeSubcomponent = activeComponentSubcomponents[activeComponentSubcomponentName];
    if (!activeSubcomponent.tempOriginalCustomProperties) {
      CopyNestedComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(activeComponentSubcomponents, activeComponentSubcomponentName);
    }
    const componentToBeCopiedCustomCss = subcomponentsToBeCopied[subcomponentToBeCopiedName].customCss;
    activeSubcomponent.customCss = componentToBeCopiedCustomCss;
    activeSubcomponent.customFeatures = subcomponentsToBeCopied[subcomponentToBeCopiedName].customFeatures;
    if (!componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top) {
      componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddNewGenericComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  public static setActiveComponentToCopyNestedComponent(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    const componentToBeCopiedSubcomponentNames = componentToBeCopied.coreSubcomponentNames;
    const activeComponentSubcomponentNames = activeComponent.subcomponents[activeComponent.activeSubcomponentName].nestedComponent.ref.coreSubcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      CopyNestedComponentModeTempPropertiesUtils.copyTargetSubcomponent(componentToBeCopied.subcomponents, componentToBeCopiedSubcomponentNames[subcomponentName],
        activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName]);
    });
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    subcomponentProperties.customCss = subcomponentProperties.tempOriginalCustomProperties.customCss;
    subcomponentProperties.customFeatures = subcomponentProperties.tempOriginalCustomProperties.customFeatures; 
  }

  public static cleanComponent(activeComponent: WorkshopComponent, resetOriginalProperties: boolean): void {
    const activeComponentSubcomponentNamesObj = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].nestedComponent.ref.coreSubcomponentNames;
    const activeComponentSubcomponentNamesArr = Object.keys(activeComponentSubcomponentNamesObj);
    for (let i = 0; i < activeComponentSubcomponentNamesArr.length; i += 1) {
      const activeSubcomponent = activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]];
      if (!activeSubcomponent.tempOriginalCustomProperties) break;
      if (resetOriginalProperties) { CopyNestedComponentModeTempPropertiesUtils.resetOriginalCss(activeSubcomponent); }
      delete activeSubcomponent.tempOriginalCustomProperties;
    }
  }

  public static setLastSelectectedComponentToCopy(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].nestedComponent.lastSelectedComponentToCopy = componentToBeCopied;
  }

  public static deleteLastSelectedComponentToCopy(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].nestedComponent.lastSelectedComponentToCopy;
  }
}
