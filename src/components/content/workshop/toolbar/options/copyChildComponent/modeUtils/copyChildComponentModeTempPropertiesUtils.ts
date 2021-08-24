import { CoreSubcomponentRefsUtils } from '../../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewChildComponent/add/addNewGenericComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';

export class CopyChildComponentModeTempPropertiesUtils {
  
  private static moveCustomPropertiesToTempProperties(activeComponentSubcomponent: SubcomponentProperties): void {
    activeComponentSubcomponent.tempOriginalCustomProperties = {
      customCss: activeComponentSubcomponent.customCss,
      customFeatures: activeComponentSubcomponent.customFeatures,
    };
  }

  private static copyTargetSubcomponent(subcomponentToBeCopied: SubcomponentProperties, activeComponentSubcomponent: SubcomponentProperties): void {
    if (!activeComponentSubcomponent) return;
    if (!activeComponentSubcomponent.tempOriginalCustomProperties) {
      CopyChildComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(activeComponentSubcomponent);
    }
    activeComponentSubcomponent.customFeatures = subcomponentToBeCopied.customFeatures;
    const componentToBeCopiedCustomCss = subcomponentToBeCopied.customCss;
    activeComponentSubcomponent.customCss = componentToBeCopiedCustomCss;
    if (!componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top) {
      componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddNewGenericComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  public static setActiveComponentToCopyChildComponent(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    const activeComponentSubcomponentCoreRefs = activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.ref.coreSubcomponentRefs;
    console.log(activeComponentSubcomponentCoreRefs);
    Object.keys(activeComponentSubcomponentCoreRefs).forEach((coreSubcomponentType) => {
      CopyChildComponentModeTempPropertiesUtils.copyTargetSubcomponent(componentToBeCopied.coreSubcomponentRefs[coreSubcomponentType],
        activeComponentSubcomponentCoreRefs[coreSubcomponentType]);
    });
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    subcomponentProperties.customCss = subcomponentProperties.tempOriginalCustomProperties.customCss;
    subcomponentProperties.customFeatures = subcomponentProperties.tempOriginalCustomProperties.customFeatures; 
  }

  public static cleanComponent(activeComponent: WorkshopComponent, resetOriginalProperties: boolean): void {
    const { coreSubcomponentRefs } = activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.ref;
    const coreSubcomponentRefsArray = CoreSubcomponentRefsUtils.getActiveRefsArray(coreSubcomponentRefs);
    for (let i = 0; i < coreSubcomponentRefsArray.length; i += 1) {
      const activeSubcomponent = coreSubcomponentRefsArray[i];
      if (!activeSubcomponent.tempOriginalCustomProperties) break;
      if (resetOriginalProperties) { CopyChildComponentModeTempPropertiesUtils.resetOriginalCss(activeSubcomponent); }
      delete activeSubcomponent.tempOriginalCustomProperties;
    }
  }

  public static setLastSelectectedComponentToCopy(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].seedComponent.lastSelectedComponentToCopy = componentToBeCopied;
  }

  public static deleteLastSelectedComponentToCopy(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.lastSelectedComponentToCopy;
  }
}
