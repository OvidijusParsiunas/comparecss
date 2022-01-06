import { CHILD_COMPONENTS_BASE_NAMES, TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { AddChildComponentOverlay } from '../../../../componentPreview/utils/elements/overlays/addChildComponentOverlay';
import { childComponentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from './addContainerComponent';

export class AddTemporaryAddPreviewContainerComponent extends AddContainerComponent {

  public static addTemporary(activeComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): WorkshopComponent {
    const { componentType, componentStyle, parentLayer, containerComponent,
      } = AddContainerComponent.getNewComponentProperties(activeComponent, newComponentBaseName);
    const componentGenerator = childComponentTypeToStyleGenerators[componentType][componentStyle];
    const [newComponent] = AddContainerComponent.createNewComponent(componentType, componentStyle, componentGenerator, activeComponent, null,
      activeComponent.childComponentHandlers.onAddOverwritables?.onBuildProperties, TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY);
    AddChildComponentOverlay.display(newComponent);
    Object.assign(containerComponent.subcomponents, newComponent.subcomponents);
    AddContainerComponent.addNewComponentToComponentPreview(newComponent, parentLayer);
    AddContainerComponent.executeOverwritables(newComponent, activeComponent, 'container', true);
    return newComponent;
  }
}
