import { LocalComponents } from './styled.ts';
import { HEIGHTS } from '../../utils/sizes.ts';

export interface ButtonProps {
  type?: 'primary' | 'secondary';
  label: string;
  width?: number | 'full';
  height?: number;
  onClick?: () => void;
  isDisabled?: boolean;
}

const Button = ({
  type = 'primary',
  label,
  width = 'full',
  height = HEIGHTS.medium,
  onClick,
  isDisabled = false,
}: ButtonProps) => {
  return (
    <LocalComponents.Button type={type} onClick={onClick} width={width} height={height} $isDisabled={isDisabled}>
      {label}
    </LocalComponents.Button>
  );
};

export default Button;
