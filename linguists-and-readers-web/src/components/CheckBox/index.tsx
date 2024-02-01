import { LocalComponents } from './styled.ts';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { COLORS } from '../../utils/colors.ts';
import { Dispatch, SetStateAction } from 'react';

interface CheckBoxProps {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  label?: string;
}

const CheckBox = ({ value, setValue, label }: CheckBoxProps) => {
  const handleClick = () => {
    setValue((prev) => !prev);
  };

  return (
    <LocalComponents.Container onClick={handleClick}>
      <>
        {value ? (
          <CheckBoxIcon fontSize={'large'} htmlColor={COLORS.primary} />
        ) : (
          <CheckBoxOutlineBlankIcon fontSize={'large'} htmlColor={COLORS.primary} />
        )}
      </>
      {label && <LocalComponents.Label>{label}</LocalComponents.Label>}
    </LocalComponents.Container>
  );
};

export default CheckBox;
