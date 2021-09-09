import { CHILD_COMPONENTS_BASE_NAMES, TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewContainerComponent } from './addNewContainerComponent';

export class AddTemporaryAddPreviewGenericComponent extends AddNewContainerComponent {

  private static highlightPaddingComponentChildren(paddingComponentChild: WorkshopComponent): void {
    paddingComponentChild.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    paddingComponentChild.linkedComponents.auxiliary.forEach((auxiliaryComponent) => {
      auxiliaryComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    });
  }

  private static highlightSubcomponents(newComponent: WorkshopComponent): void {
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    if (newComponent.paddingComponentChild) {
      AddTemporaryAddPreviewGenericComponent.highlightPaddingComponentChildren(newComponent.paddingComponentChild);
    }
  }

  public static addTemporary(activeComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): WorkshopComponent {
    const { componentType, componentStyle, parentLayer, containerComponent,
      } = AddNewContainerComponent.getNewComponentProperties(activeComponent, newComponentBaseName);
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const [newComponent] = AddNewContainerComponent.createNewComponent(componentType, componentStyle,
      componentGenerator, activeComponent, null, null, TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY);
    AddTemporaryAddPreviewGenericComponent.highlightSubcomponents(newComponent);
    Object.assign(containerComponent.subcomponents, newComponent.subcomponents);
    AddNewContainerComponent.addNewComponentToComponentPreview(newComponent, parentLayer);
    return newComponent;
  }
}
