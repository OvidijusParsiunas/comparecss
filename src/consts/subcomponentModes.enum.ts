export enum SUB_COMPONENTS {
  BASE = 'Base',
  CLOSE = 'Close',
  LAYER_1 = 'Layer 1',
  LAYER_2 = 'Layer 2',
  LAYER_3 = 'Layer 3',
  BUTTON_1 = 'Button 1',
  BUTTON_2 = 'Button 2',
  BUTTON_COMPONENT_TEXT = 'Button component text', // used to explicitly set the text of a component which only has custom css in the base and text in the layer section
  SINGLE_LAYER_BASE = 'Base ', // the component layer custom css acts as the base - and the subcomponent dropdown points base towards the layer
}
