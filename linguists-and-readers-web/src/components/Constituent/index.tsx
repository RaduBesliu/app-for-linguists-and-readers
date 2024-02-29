import { ConstituentJson } from '../../api/constituent/types.ts';
import { LocalComponents } from './styled.ts';

const Constituent = ({ constituent }: { constituent: ConstituentJson }) => {
  const onClick = () => {
    console.log(constituent);
  };

  return <LocalComponents.Span onClick={onClick}>{constituent.text}</LocalComponents.Span>;
};

export default Constituent;
