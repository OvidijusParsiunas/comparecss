import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewImportedComponent } from '../../addNewSubcomponentUtils/add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from '../../addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { NewComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { CopyComponentShared } from './copyComponentShared';

export class CopyNewSubcomponent extends CopyComponentShared {
  
  private static copyExistingSubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    if (!subcomponentBeingCopied.baseSubcomponentRef && subcomponentBeingCopied.importedComponent?.inSync) {
      CopyComponentShared.copyInSyncSubcomponent(subcomponentBeingCopied.importedComponent, newSubcomponent, subcomponentBeingCopied);
    } else {
      CopyComponentShared.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }

  private static copyExistingSubcomponentsProperties(subcomponentBeingCopied: SubcomponentProperties, newImportedComponent: NewComponentProperties): void {
    const { importedComponent: copiedImportedComponent } = subcomponentBeingCopied;
    const newSubcomponentNames = Object.keys(newImportedComponent.subcomponents);
    const copiedSubcomponentNames = Object.keys(copiedImportedComponent.componentRef.subcomponents);
    for (let i = 0; i < newSubcomponentNames.length; i += 1) {
      const newSubcomponent = newImportedComponent.subcomponents[newSubcomponentNames[i]];
      const subcomponentBeingCopied = copiedImportedComponent.componentRef.subcomponents[copiedSubcomponentNames[i]];
      CopyNewSubcomponent.copyExistingSubcomponentProperties(newSubcomponent, subcomponentBeingCopied)
    }
  }

  private static getNewImportedComponentParentLayer(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      copiedComponentParentLayer: Layer): Layer {
    const { layers: newComponentLayers } = newComponent.componentPreviewStructure;
    const { layers: copiedComponentLayers } = componentBeingCopied.componentPreviewStructure;
    return newComponentLayers[copiedComponentLayers.indexOf(copiedComponentParentLayer)];
  }

  private static createNewAndCopyExistingComponentProperties(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      subcomponentName: string, baseComponentRefs: WorkshopComponent[]): void {
    const { importedComponent: { componentRef: { type, style } }, parentLayer } = componentBeingCopied.subcomponents[subcomponentName];
    const newImportedComponentParentLayer = CopyNewSubcomponent.getNewImportedComponentParentLayer(newComponent, componentBeingCopied, parentLayer);
    const newImportedComponent = AddNewImportedComponent.add(newComponent, type, style, newImportedComponentParentLayer.name);
    baseComponentRefs.push(newImportedComponent.subcomponents[newImportedComponent.baseName].importedComponent.componentRef);
    CopyNewSubcomponent.copyExistingSubcomponentsProperties(componentBeingCopied.subcomponents[subcomponentName], newImportedComponent);
  }

  private static createNewAndCopyExistingLayerProperties(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      subcomponentName: string, newComponentStyle: COMPONENT_STYLES): void {
    const layerComponent = AddNewLayerSubcomponent.add(newComponent, newComponentStyle, true);
    CopyComponentShared.copySubcomponentProperties(layerComponent.subcomponents[layerComponent.baseName],
      componentBeingCopied.subcomponents[subcomponentName]);
  }

  public static copy(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      subcomponentName: string, baseComponentRefs: WorkshopComponent[]): void {
    const { type, style } = componentBeingCopied.subcomponents[subcomponentName].importedComponent.componentRef;
    if (type === COMPONENT_TYPES.LAYER) {
      CopyNewSubcomponent.createNewAndCopyExistingLayerProperties(newComponent, componentBeingCopied, subcomponentName, style);
    } else {
      CopyNewSubcomponent.createNewAndCopyExistingComponentProperties(newComponent, componentBeingCopied,
      subcomponentName, baseComponentRefs)
    }
  }
}
