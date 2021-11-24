export interface WorkshopComponentCss {
  // borderWidth property has been removed and should not be used: check DOC: 7880 for details
  borderStyle?: string;
  borderColor?: string;
  borderBottomWidth?: string;
  borderBottomStyle?: string;
  borderBottomColor?: string;
  borderTopWidth?: string;
  borderTopStyle?: string;
  borderTopColor?: string;
  borderLeftWidth?: string;
  borderLeftStyle?: string;
  borderLeftColor?: string;
  borderRightWidth?: string;
  borderRightStyle?: string;
  borderRightColor?: string;
  borderRadius?: string;
  transition?: string; // this is mostly used to mark a transition style that will be removed when exporting css files
  boxShadow?: string; // should not start with '0px 0px 0px 0px' due to DOC: 7879
  backgroundColor?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  width?: string;
  minWidth?: string;
  height?: string;
  fontFamily?: string;
  textAlign?: string;
  fontSize?: string;
  fontWeight?: string;
  display?: string;
  outline?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  margin?: string;
  lineHeight?: string;
  color?: string;
  boxSizing?: string;
  cursor?: string;
  verticalAlign?: string;
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  float?: string;
  overflow?: string;
  transform?: string;
  pointerEvents?: string;
  userSelect?: string;
  zIndex?: number;
  wordBreak?: string;
  backgroundImage?: string;
  order?: string;
}

// DOC: 7880
// borderWidth has been removed due to a browser (agnostic) bug that displays a border (1.2...px width) on the newly
// selected component if the previous component had a side specific border and a new one did not have the same one
// so if the previous component had borderBottomWidth and the new one does not - the new component will have
// a border at the bottom of the component until the user hovers their mouse over the component so that the new
// css can be gerenated to overwrite it
// therefore none of the components use borderWidth and all border sides should be updated when updating the border
// hence borderLeftWidth has been selected as the BORDER_WIDTH_CSS_PROPERTY_ALIAS and updates all border widths
// when is being changed by the user
