import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faAngleDoubleDown, faAngleDown, faAngleRight, faCaretDown, faLongArrowAltDown,
  faSyncAlt, faCheck, faExpand, faCompress, faPlay, faStop, faUpload,
} from '@fortawesome/free-solid-svg-icons'

export default function addFontAwesomeIcons(): void {
  library.add(faAngleDown);
  library.add(faAngleDoubleDown);
  library.add(faAngleRight);
  library.add(faCaretDown);
  library.add(faLongArrowAltDown);
  library.add(faSyncAlt);
  library.add(faCheck);
  library.add(faExpand);
  library.add(faCompress);
  library.add(faPlay);
  library.add(faStop);
  library.add(faUpload);
}
