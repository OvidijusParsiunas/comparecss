import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { BaseSubcomponentRef, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';

export class CoreSubcomponentRefsUtils {

  public static getActiveRefKeys(coreSubcomponentRefs: CoreSubcomponentRefs): SUBCOMPONENT_TYPES[] {
    return Object.keys(coreSubcomponentRefs || {})
      .filter((subcomponentType) => coreSubcomponentRefs[subcomponentType]) as unknown as SUBCOMPONENT_TYPES[];
  }

  public static getActiveRefsArray(coreSubcomponentRefs: CoreSubcomponentRefs): SubcomponentProperties[] {
    return CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs || {})
      .map((subcomponentType) => coreSubcomponentRefs[subcomponentType]);
  }

  private static findLayerInPreview(component: WorkshopComponent): Layer {
    return component.containerComponent.componentPreviewStructure.layers
      .find((layer) => layer.subcomponentProperties === component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
  }

  private static overwriteLayerChildrenComponentJsClasses(component: WorkshopComponent): void {
    const { sections: { alignedSections } } = CoreSubcomponentRefsUtils.findLayerInPreview(component);
    const { jsClasses } = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures;
    Object.keys(alignedSections).forEach((alignedSection) => {
      (alignedSections[alignedSection] as BaseSubcomponentRef[]).forEach((childBaseSubcomponent) => {
        const childCoreComponentRefs = childBaseSubcomponent.subcomponentProperties.seedComponent.coreSubcomponentRefs;
        (component.referenceSharingExecutables || []).forEach((executable) => executable(childCoreComponentRefs, jsClasses));        
      });
    });
  }

  public static executeReferenceSharingExecutables(...components: WorkshopComponent[]): void {
    components.forEach((component) => {
      if (component.type === COMPONENT_TYPES.LAYER) CoreSubcomponentRefsUtils.overwriteLayerChildrenComponentJsClasses(component);
      const { referenceSharingExecutables, coreSubcomponentRefs } = component;
      (referenceSharingExecutables || []).forEach((executable) => executable(coreSubcomponentRefs));        
    });
  }
}
