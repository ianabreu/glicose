import { Button as ButtonBase } from './Button';
import { ButtonIcon } from './ButtonIcon';
import { ButtonText } from './ButtonText';

const Button = Object.assign(ButtonBase, {
  Text: ButtonText,
  Icon: ButtonIcon,
});

export { Button };
