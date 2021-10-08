import { UpdateContainerComponentDropdownUtils } from './updateContainerComponentDropdownUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateDropdownItemNamesShared } from './updateDropdownItemNamesShared';
import { ArrayUtils } from '../../generic/arrayUtils';

export class UpdateLinkedComponentsDropdownItemNames extends UpdateDropdownItemNamesShared {

  public static update(baseComponent: WorkshopComponent): void {
    const { subcomponentDropdownStructure } = baseComponent.componentPreviewStructure;
    const { itemDataMaps, stateObjects: { overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures },
      } = UpdateContainerComponentDropdownUtils.generateItemUpdateInitializationObjects(subcomponentDropdownStructure);
    const subcomponentNames = UpdateDropdownItemNamesShared.getSubcomponentNames(subcomponentDropdownStructure);
    subcomponentNames.forEach((subcomponentName) => {
      UpdateContainerComponentDropdownUtils.updateItemNames(baseComponent, itemDataMaps, subcomponentDropdownStructure,
        overwrittenItemNames, newDrodpownNames, subcomponentName, overwrittenDropdownStructures);
    });
    ArrayUtils.differenceInArrays(overwrittenItemNames, newDrodpownNames);
    UpdateContainerComponentDropdownUtils.removeOldItemNames(overwrittenItemNames, newDrodpownNames, subcomponentDropdownStructure);
  }
}
