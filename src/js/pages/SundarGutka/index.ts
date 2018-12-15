import { connect } from 'react-redux';
import SundarGutka from './SundarGutka';
import { State } from '@/features/types';

export default connect(({ transliterationLanguages }: State) => ({
  transliterationLanguages,
}))(SundarGutka);
