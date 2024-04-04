import { LocalComponents } from './styled.ts';
import { HEIGHTS } from '../../utils/sizes.ts';

export interface PickerProps {
  values: readonly string[];
  activeValues: string[];
  setActiveValues: (values: string[]) => void;
  isSingleSelect?: boolean;
  width?: number | 'full';
  height?: number;
  wrap?: boolean;
}

const Picker = ({
  values,
  activeValues,
  setActiveValues,
  isSingleSelect = true,
  width = 'full',
  height = HEIGHTS.medium,
  wrap = false,
}: PickerProps) => {
  const onPickerItemClick = (value: string) => {
    if (isSingleSelect) {
      setActiveValues([value.toLowerCase()]);
      return;
    }

    if (activeValues.includes(value)) {
      setActiveValues(activeValues.filter((activeValue) => activeValue.toLowerCase() !== value.toLowerCase()));
      return;
    }

    setActiveValues([...activeValues, value]);
  };

  return (
    <LocalComponents.Container width={width} wrap={wrap}>
      {values.map((value) => {
        return (
          <LocalComponents.PickerItem
            key={value}
            height={height}
            $isActive={activeValues.includes(value.toLowerCase())}
            onClick={() => onPickerItemClick(value)}>
            {value}
          </LocalComponents.PickerItem>
        );
      })}
    </LocalComponents.Container>
  );
};

export default Picker;
