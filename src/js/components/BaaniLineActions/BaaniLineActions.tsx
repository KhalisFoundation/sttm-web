import React from 'react';
import { Link } from 'react-router-dom';

import { ACTIONS, clickEvent } from '@/util/analytics';
import { toShabadURL } from '@/util';

import TwitterIcon from '@/components/Icons/Twitter';
import ClipboardIcon from '@/components/Icons/Clipboard';
import ExternalLinkIcon from '@/components/Icons/ExternalLink';
import FacebookIcon from '@/components/Icons/Facebook';

export const supportedActions = ['openShabad', 'copy', 'tweet', 'facebook'];

const openShabad = () =>
  clickEvent({
    action: ACTIONS.LINE_SHARER,
    label: ' open-shabad',
  });

export interface IBaaniLineActionsProps {
  shabad: {
    id: string | number;
    shabadid: string;
  };
  disabledActions: string[];
  onCopyClick: () => void;
  onTweetClick?: () => void;
  onFacebookClick?: () => void;
}

export default class BaaniLineActions extends React.PureComponent<
  IBaaniLineActionsProps
> {
  public static defaultProps = {
    disabledActions: [],
  };

  public render() {
    const {
      shabad,
      disabledActions,
      onCopyClick,
      onTweetClick,
      onFacebookClick,
    } = this.props;

    const actions = {
      openShabad: (
        <Link
          key={0}
          role="button"
          aria-label="Go to shabad"
          title="Go to shabad"
          onClick={openShabad}
          to={toShabadURL({ shabad })}
        >
          <ExternalLinkIcon />
        </Link>
      ),
      copy: (
        <a
          key={1}
          className="copy"
          onClick={onCopyClick}
          role="button"
          aria-label="Copy to clipboard"
          title="Copy to clipboard"
        >
          <ClipboardIcon />
        </a>
      ),
      facebook: (
        <a
          key={3}
          className="facebook"
          onClick={onFacebookClick}
          role="button"
          aria-label="Share on facebook"
          title="Share on facebook"
        >
          <FacebookIcon />
        </a>
      ),
      tweet: (
        <a
          key={4}
          className="twitter"
          onClick={onTweetClick}
          role="button"
          aria-label="Tweet this line"
          title="Tweet this line"
        >
          <TwitterIcon />
        </a>
      ),
    };

    return (
      <div className="share">
        {supportedActions
          .filter(e => !disabledActions.includes(e))
          .map(
            action =>
              // @ts-ignore
              actions[action]
          )}
      </div>
    );
  }
}
