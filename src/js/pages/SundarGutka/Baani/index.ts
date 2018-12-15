import Baani, { IBaaniProps } from './Baani';
import { connect } from 'react-redux';
import { State } from '@/features/types';

export { IBaaniProps };
export default connect(({ paragraphView }: State) => ({ paragraphView }))(
  Baani
);
