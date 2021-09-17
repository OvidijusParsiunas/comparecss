import { CoreSubcomponentRefsUtils } from '../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { CopyChildComponentModeTempPropertiesUtils } from './modeUtils/copyChildComponentModeTempPropertiesUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ReferenceSharingExecutable } from '../../../../../../interfaces/referenceSharingExecutable';
import { BaseSubcomponentRef } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {

  private static dereferenceCopiedComponentCustomProperties(baseSubcomponent: SubcomponentProperties): void {
    const { referenceSharingExecutables, coreSubcomponentRefs } = baseSubcomponent.seedComponent;
    CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs).forEach((subcomponentType) => {
      const subcomponent = coreSubcomponentRefs[subcomponentType];
      if (!subcomponent) return;
      subcomponent.customCss = JSONUtils.deepCopy(subcomponent.customCss);
      subcomponent.customFeatures = JSONUtils.deepCopy(subcomponent.customFeatures);
    });
    (referenceSharingExecutables || []).forEach((executable: ReferenceSharingExecutable) => executable(coreSubcomponentRefs));
  }

  // WORK2 - refactor
  private static getReferenceSharingComponent({ seedComponent }: SubcomponentProperties): WorkshopComponent {
    const { referenceSharingExecutables, containerComponent } = seedComponent;
    const activeSeedComponent = referenceSharingExecutables ? seedComponent : containerComponent;
    return activeSeedComponent?.paddingComponent || activeSeedComponent?.linkedComponents?.base?.paddingComponent || activeSeedComponent;
  }

  // if active subcomponent is text in a nested button, need to make sure to get the button base
  private static getActiveReferenceSharingComponentBase(containerComponent: WorkshopComponent): SubcomponentProperties {
    const activeSubcomponent = containerComponent.subcomponents[containerComponent.activeSubcomponentName];
    return SyncedComponent.getReferenceSharingComponent(activeSubcomponent).coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }

  // WORK2 - refactor
  public static toggleSubcomponentSync(containerComponent: WorkshopComponent, useActiveReferenceSharingComponent = true, callback?: () => void): void {
    const baseSubcomponent = useActiveReferenceSharingComponent
      ? SyncedComponent.getActiveReferenceSharingComponentBase(containerComponent) : containerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (baseSubcomponent.seedComponent.paddingComponentChild) {
      baseSubcomponent.seedComponent.paddingComponentChild.linkedComponents.auxiliary.forEach((auxiliary) => {
        SyncedComponent.dereferenceCopiedComponentCustomProperties(auxiliary.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
        auxiliary.componentPreviewStructure.layers.forEach((layer) => {
          const { alignedSections } = layer.sections;
          Object.keys(alignedSections).forEach((alignedSection) => {
            alignedSections[alignedSection].forEach((baseSubcomponentRef: BaseSubcomponentRef) => {
              SyncedComponent.dereferenceCopiedComponentCustomProperties(baseSubcomponentRef.subcomponentProperties);
            });
          });
          SyncedComponent.dereferenceCopiedComponentCustomProperties(layer.subcomponentProperties);
        });
      });
      SyncedComponent.dereferenceCopiedComponentCustomProperties(baseSubcomponent);
      SyncedComponent.dereferenceCopiedComponentCustomProperties(baseSubcomponent.seedComponent.paddingComponentChild.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
      baseSubcomponent.seedComponent.sync.syncedComponent = null;
    } else if (baseSubcomponent.seedComponent.sync.syncedComponent) {
      SyncedComponent.dereferenceCopiedComponentCustomProperties(baseSubcomponent);
      baseSubcomponent.seedComponent.sync.syncedComponent = null;
    }
    if (callback) callback();
  }

  private static findSubcomponentToCopy(syncedComponent: WorkshopComponent, newComponentBase: SubcomponentProperties): SubcomponentProperties {
    const { subcomponents } = syncedComponent;
    const subcomponentToCopy = Object.keys(subcomponents).find((subcomponentName) => {
      return subcomponents[subcomponentName].subcomponentType === newComponentBase.subcomponentType;
    });
    return subcomponents[subcomponentToCopy];
  }

  public static copyChildPropertiesFromInSyncContainerComponent(newComponent: WorkshopComponent, syncedComponent: WorkshopComponent): void {
    const newComponentBase = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const subcomponentToCopy = SyncedComponent.findSubcomponentToCopy(syncedComponent, newComponentBase);
    if (subcomponentToCopy) CopyChildComponentModeTempPropertiesUtils.copyTargetSubcomponent(subcomponentToCopy, newComponentBase);
  }

  public static updateIfSubcomponentNotInSync(masterComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const referenceSharingComponent = SyncedComponent.getReferenceSharingComponent(activeSubcomponent);
    if (referenceSharingComponent?.sync.syncedComponent && referenceSharingComponent.componentStatus.isRemoved) {
      SyncedComponent.toggleSubcomponentSync(masterComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const referenceSharingComponent = SyncedComponent.getReferenceSharingComponent(activeSubcomponent);
    return referenceSharingComponent?.sync.syncedComponent && !referenceSharingComponent.componentStatus.isRemoved;
  }
}
