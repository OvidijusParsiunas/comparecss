import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';

export class CopyNestedComponentModeTempPropertiesUtils {
  
  private static moveCustomPropertiesToTempProperties(activeComponentSubcomponent: SubcomponentProperties): void {
    activeComponentSubcomponent.tempOriginalCustomProperties = {
      customCss: activeComponentSubcomponent.customCss,
      customFeatures: activeComponentSubcomponent.customFeatures,
    };
  }

  private static copyTargetSubcomponent(subcomponentToBeCopied: SubcomponentProperties, activeComponentSubcomponent: SubcomponentProperties): void {
    if (!activeComponentSubcomponent.tempOriginalCustomProperties) {
      CopyNestedComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(activeComponentSubcomponent);
    }
    activeComponentSubcomponent.customFeatures = subcomponentToBeCopied.customFeatures;
    const componentToBeCopiedCustomCss = subcomponentToBeCopied.customCss;
    activeComponentSubcomponent.customCss = componentToBeCopiedCustomCss;
    if (!componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top) {
      componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddNewGenericComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  public static setActiveComponentToCopyNestedComponent(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    const activeComponentSubcomponentCoreRefs = activeComponent.subcomponents[activeComponent.activeSubcomponentName].nestedComponent.ref.coreSubcomponentRefs;
    Object.keys(activeComponentSubcomponentCoreRefs).forEach((coreSubcomponentType: keyof CoreSubcomponentRefs) => {
      CopyNestedComponentModeTempPropertiesUtils.copyTargetSubcomponent(componentToBeCopied.coreSubcomponentRefs[coreSubcomponentType],
        activeComponentSubcomponentCoreRefs[coreSubcomponentType]);
    });
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    subcomponentProperties.customCss = subcomponentProperties.tempOriginalCustomProperties.customCss;
    subcomponentProperties.customFeatures = subcomponentProperties.tempOriginalCustomProperties.customFeatures; 
  }

  public static cleanComponent(activeComponent: WorkshopComponent, resetOriginalProperties: boolean): void {
    const { coreSubcomponentRefs } = activeComponent.subcomponents[activeComponent.activeSubcomponentName].nestedComponent.ref;
    const coreSubcomponentTypes = Object.keys(coreSubcomponentRefs).filter((coreSubcomponentKey) => coreSubcomponentRefs[coreSubcomponentKey]);
    for (let i = 0; i < coreSubcomponentTypes.length; i += 1) {
      const activeSubcomponent = coreSubcomponentRefs[coreSubcomponentTypes[i]];
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
