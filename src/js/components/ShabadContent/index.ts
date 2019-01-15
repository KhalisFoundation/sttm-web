import { connect } from 'react-redux';
import { IStore } from '@/features/types';

import ShabadContent from './ShabadContent';

const stateToProps = (state: IStore) => state;

export default connect(stateToProps)(ShabadContent);
