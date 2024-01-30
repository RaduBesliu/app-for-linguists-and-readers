import { LocalComponents } from './styled.ts';
import { HEIGHTS } from '../../utils/sizes.ts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ChangeEvent, useState } from 'react';
import { COLORS } from '../../utils/colors.ts';

export interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
  type?: 'text' | 'password';
  placeholder: string;
  label?: string;
  width?: number | 'full';
  height?: number;
}

const TextInput = ({
  value,
  setValue,
  isValid,
  setIsValid,
  type = 'text',
  placeholder,
  label,
  width = 'full',
  height = HEIGHTS.medium,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (!isValid) {
      setIsValid(true);
    }
  };

  const renderInputBasedOnType = () => {
    if (type === 'password') {
      return (
        <LocalComponents.InputWrapper width={width}>
          <LocalComponents.Input
            value={value}
            onChange={updateValue}
            type={showPassword ? 'text' : type}
            placeholder={placeholder}
            height={height}
            $hasIconPadding={true}
            $isValid={isValid}
          />
          <LocalComponents.IconWrapper
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}>
            {showPassword ? (
              <VisibilityIcon htmlColor={COLORS.primary} />
            ) : (
              <VisibilityOffIcon htmlColor={COLORS.primary} />
            )}
          </LocalComponents.IconWrapper>
        </LocalComponents.InputWrapper>
      );
    }

    return (
      <LocalComponents.InputWrapper width={width}>
        <LocalComponents.Input
          value={value}
          onChange={updateValue}
          type={type}
          placeholder={placeholder}
          height={height}
          $isValid={isValid}
        />
      </LocalComponents.InputWrapper>
    );
  };

  return (
    <>
      {label ? (
        <LocalComponents.Container width={width}>
          <LocalComponents.Label>{label}</LocalComponents.Label>
          {renderInputBasedOnType()}
        </LocalComponents.Container>
      ) : (
        renderInputBasedOnType()
      )}
    </>
  );
};

export default TextInput;
