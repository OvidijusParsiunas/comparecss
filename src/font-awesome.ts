import { faAngleDoubleDown, faAngleDown, faAngleRight, faCaretDown, faLongArrowAltDown, faSyncAlt, faCheck, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

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
}
