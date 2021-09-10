import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';

export class DropdownUtils {

  public static generateDropdownStructure(options: string[]): NestedDropdownStructure {
    return options.reduce((accummulator, currentValue) => Object.assign(accummulator, {[currentValue]: null}), {});
  }
}
