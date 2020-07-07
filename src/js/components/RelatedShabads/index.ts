import { connect } from 'react-redux';
import RelatedShabads from './RelatedShabads';
import { IStore } from '@/features/types';

export default connect(
  ({
    larivaar,
    larivaarAssist,
    unicode,
    translationLanguages,
    transliterationLanguages,
  }: IStore) => ({
    translationLanguages,
    larivaar,
    larivaarAssist,
    unicode,
    transliterationLanguages,
  })
)(RelatedShabads);
