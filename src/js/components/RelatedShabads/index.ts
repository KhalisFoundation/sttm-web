import { connect } from 'react-redux';
import RelatedShabads from './RelatedShabads';
import { IStore } from '@/features/types';

export default connect(
  ({
    larivaar,
    larivaarAssist,
    larivaarAssistStrength,
    unicode,
    translationLanguages,
    transliterationLanguages,
  }: IStore) => ({
    translationLanguages,
    larivaar,
    larivaarAssist,
    larivaarAssistStrength,
    unicode,
    transliterationLanguages,
  })
)(RelatedShabads);
