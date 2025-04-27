import { Option as OptionBase } from './Option';
import { OptionIcon } from './OptionIcon';
import { OptionText } from './OptionText';

const Option = Object.assign(OptionBase, {
  Text: OptionText,
  Icon: OptionIcon,
});

export { Option };
