import { UpdateContainerComponentDropdownUtils } from './updateContainerComponentDropdownUtils';
import { UpdateDropdownItemNamesShared } from './updateDropdownItemNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ArrayUtils } from '../../generic/arrayUtils';

export class UpdatePaddingComponentDropdownItemNames extends UpdateDropdownItemNamesShared {

  public static updatePaddingComponentChildren(component: WorkshopComponent): void {
    const { subcomponentDropdownStructure } = component.componentPreviewStructure;
    const { itemDataMaps, stateObjects: { overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures },
      } = UpdateContainerComponentDropdownUtils.generateItemUpdateInitializationObjects(subcomponentDropdownStructure);
    const subcomponentNames = UpdateDropdownItemNamesShared.getSubcomponentNames(subcomponentDropdownStructure);
    subcomponentNames.forEach((subcomponentName) => {
      UpdateContainerComponentDropdownUtils.updateItemNames(component, itemDataMaps, subcomponentDropdownStructure,
        overwrittenItemNames, newDrodpownNames, subcomponentName, overwrittenDropdownStructures);
    });
    ArrayUtils.differenceInArrays(overwrittenItemNames, newDrodpownNames);
    UpdateContainerComponentDropdownUtils.removeOldItemNames(overwrittenItemNames, newDrodpownNames, subcomponentDropdownStructure);
  }
}
