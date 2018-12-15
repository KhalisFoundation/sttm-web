import { connect } from 'react-redux';
import { State } from '@/features/types';
import ShabadContent from './ShabadContent';

const stateToProps = (state: State) => state;
export default connect(stateToProps)(ShabadContent);
