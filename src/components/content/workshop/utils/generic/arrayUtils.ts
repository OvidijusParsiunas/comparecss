export class ArrayUtils {
  
  public static changeElementPosition(array: unknown[], startingIndex: number, finalIndex: number): void {
    const subjectElement = array[startingIndex];
    array.splice(startingIndex, 1);
    array.splice(finalIndex, 0, subjectElement);
  }
}
