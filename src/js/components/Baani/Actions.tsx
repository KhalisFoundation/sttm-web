import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import ClipboardIcon from '@/components/Icons/Clipboard';
import ExternalLinkIcon from '@/components/Icons/ExternalLink';
import FacebookIcon from '@/components/Icons/Facebook';
import { toShabadURL } from '@/util';
import { clickEvent, ACTIONS } from '@/util/analytics';

const openShabad = () =>
  clickEvent({
    action: ACTIONS.MOBILE_LINE_SHARER,
    label: ' open-shabad',
  });

export interface IActionsProps {
  shabad?: {
    id: string | number;
    shabadid: string;
  };
  onCopyClick: () => void;
  onTweetClick?: () => void;
  onFacebookClick?: () => void;
  className?: string;
}

function Actions(props: IActionsProps) {
  const { className, shabad, onFacebookClick, onCopyClick } = props;
  return (
    <div className={cx('baaniLineActions', className)}>
      {shabad && (
        <Link
          role="button"
          aria-label="Go to shabad"
          title="Go to shabad"
          onClick={openShabad}
          to={toShabadURL({ shabad })}
        >
          <ExternalLinkIcon />
        </Link>
      )}
      <div onClick={onFacebookClick}>
        <FacebookIcon />
      </div>
      <div onClick={onCopyClick}>
        <ClipboardIcon />
      </div>
    </div>
  );
}

export default memo(Actions);
