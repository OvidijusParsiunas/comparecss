export class SubcomponentTextUtils {
  
  public static calculateTextHeightPx(text: string, shorthandFont: string): string {
    const context = document.createElement('canvas').getContext('2d');
    context.font = shorthandFont;
    const metrics = context.measureText(text);
    return `${metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent}px`;
  }
}
