import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { CoreSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { CopyExistingSubcomponent } from './copy/copyExistingSubcomponent';
import ProcessClassName from '../../componentGenerator/processClassName';
import { CopyNewSubcomponent } from './copy/copyNewSubcomponent';
import { ComponentOptions } from 'vue';

export default class CopyComponent {

  private static executeReferenceSharingExecutables(baseComponentRefs: WorkshopComponent[], newComponent: WorkshopComponent): void {
    baseComponentRefs.forEach((nestedComponentRef) => {
      const { coreSubcomponentNames, referenceSharingExecutables } = nestedComponentRef;
      (referenceSharingExecutables || []).forEach((executable: (subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames) => void) => {
        executable(newComponent.subcomponents, coreSubcomponentNames);
      });
    });
  }

  private static addBaseComponentRef(baseComponentRefs: WorkshopComponent[], newComponent: WorkshopComponent,
      subcomponentName: string): void {
    // add the component reference if the component has been nested or if it has not
    baseComponentRefs.push(newComponent.subcomponents[subcomponentName].nestedComponent?.ref || newComponent);
  }

  private static copySubcomponent(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      subcomponentName: string, baseComponentRefs: WorkshopComponent[]): void {
    if (!newComponent.subcomponents[subcomponentName]) {
      // if base component
      if (!componentBeingCopied.subcomponents[subcomponentName].baseSubcomponentRef) {
        CopyNewSubcomponent.copy(newComponent, componentBeingCopied, subcomponentName, baseComponentRefs);
      }
      // subcomponents that are not base are not copied because their new versions are recreated from bases
      return;
    }
    CopyExistingSubcomponent.copy(newComponent.subcomponents[subcomponentName], componentBeingCopied.subcomponents[subcomponentName]);
    if (!newComponent.subcomponents[subcomponentName].baseSubcomponentRef) {
      CopyComponent.addBaseComponentRef(baseComponentRefs, componentBeingCopied, subcomponentName);
    }
  }

  private static copySubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const baseComponentRefs: WorkshopComponent[] = [];
    Object.keys(componentBeingCopied.subcomponents).forEach((subcomponentName) => {
      CopyComponent.copySubcomponent(newComponent, componentBeingCopied, subcomponentName, baseComponentRefs);
    });
    CopyComponent.executeReferenceSharingExecutables(baseComponentRefs, newComponent);
  }

  private static removeUnusedSubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    Object.keys(newComponent.subcomponents).forEach((subcomponentName) => {
      if (!componentBeingCopied.subcomponents[subcomponentName]) {
        delete newComponent.subcomponents[subcomponentName];
      }
    });
  }

  public static copyComponent(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    // used here as button builders do not inherently reset the unique id
    uniqueSubcomponentIdState.resetUniqueId();
    const newComponent = componentTypeToStyleGenerators[componentBeingCopied.type][componentBeingCopied.style].createNewComponent();
    CopyComponent.removeUnusedSubcomponents(newComponent, componentBeingCopied);
    CopyComponent.copySubcomponents(newComponent, componentBeingCopied);
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    return newComponent;
  }
}
