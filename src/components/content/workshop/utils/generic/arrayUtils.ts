export class ArrayUtils {
  
  public static changeElementPosition(array: unknown[], startingIndex: number, finalIndex: number): void {
    const subjectElement = array[startingIndex];
    array.splice(startingIndex, 1);
    array.splice(finalIndex, 0, subjectElement);
  }

  public static differenceInArrays<T>(array1: T[], array2: T[]): T[] {
    return array1.filter(x => !array2.includes(x));
  }

  public static removeItem<T>(array: T[], targetObject: T): void {
    const targetIndex = array.indexOf(targetObject);
    if (targetIndex > -1 ) array.splice(targetIndex, 1);
  }
}
