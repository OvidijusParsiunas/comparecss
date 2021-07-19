import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class UpdateComponentNamesShared {

  protected static readonly SINGLE_SPACE_STRING = ' ';

  protected static removeOverwrittenDropdownNames(oldSubcomponentNames: string[], dropdownStructure: NestedDropdownStructure): void {
    oldSubcomponentNames.forEach((name) => {
      delete dropdownStructure[name];
    });
  }

  protected static replaceSubstringAtIndex(fullString: string, index: number, replacementSubstring: string | number): string {
    return `${fullString.substring(0, index)}${replacementSubstring}`;
  }

  private static isValidNumber(postfix: number|string): postfix is number {
    return postfix !== UpdateComponentNamesShared.SINGLE_SPACE_STRING && typeof postfix === 'number';
  }

  private static parsePostfix(subcomponentName: string): string {
    return subcomponentName.match(/\d+$/)?.[0];
  }

  protected static generateNewSubcomponentName(oldSubcomponentName: string, newPostfix: number|string): string {
    let postfixLengthToReplace = 1;
    if (UpdateComponentNamesShared.isValidNumber(newPostfix)) {
      const oldPostfix = UpdateComponentNamesShared.parsePostfix(oldSubcomponentName) || 1;
      const currentPostfixLength = oldPostfix.toString().length;
      const nextPostfixLength = newPostfix.toString().length;
      // when removing number 9, need to make sure that the next 10 will get reduced to 9, hence more chars need to be removed
      postfixLengthToReplace = currentPostfixLength < nextPostfixLength ? nextPostfixLength : currentPostfixLength;
    }
    return UpdateComponentNamesShared.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - postfixLengthToReplace, newPostfix);
  }

  private static removeSubcomponentsFromParentComponents(parentComponent: WorkshopComponent, oldSubcomponentName: string, oldDropdownName: string): void {
    const nestedComponent: WorkshopComponent = parentComponent.subcomponents[oldSubcomponentName].nestedComponent.ref;
    delete nestedComponent.componentPreviewStructure.subcomponentDropdownStructure[oldDropdownName];
  }

  protected static getDropdownName(subcomponentName: string): string {
    const words = subcomponentName.trim().split(/\s+/);
    if (words.length === 3) {
      return (words[0] + ' ' + words[2]);
    } else if (words.length === 2) {
      return (words[0] + ' ' + words[1]);
    }
    return words[0];
  }

  protected static updateName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      overwrittenDropdownValues: string[], newDropdownName?: string, oldDropdownName?: string): void {
    subcomponentDropdownStructure[newDropdownName] = subcomponentDropdownStructure[oldDropdownName];
    UpdateComponentNamesShared.removeSubcomponentsFromParentComponents(parentComponent, oldSubcomponentName, oldDropdownName);
    overwrittenDropdownValues.push(oldDropdownName); 
  }
}
