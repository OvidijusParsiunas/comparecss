export type SubcomponentAndOverlayElementIds = {
  [subcomponentName: string]: {
    subcomponentId: string;
    overlayId: string;
    paddingComponentOverlayIds?: string[];
  }
}
