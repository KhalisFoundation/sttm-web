/* globals API_URL */
import React from 'react';
import ShabadContent from '@/components/ShabadContent';
import { buildApiUrl } from '@sttm/banidb';
import { TEXTS } from '@/constants';

type ViewerProps = {
  namespaceString: string;
  data: Shabad & { highlight: number };
};

type ViewerState = {
  response: Shabad | null;
};

export default class Viewer extends React.PureComponent<
  ViewerProps,
  ViewerState
> {
  public state = {
    response: null,
  };

  private fetchShabad = (id: string) =>
    Promise.resolve(this.setState({ response: null }))
      .then(() => fetch(buildApiUrl({ id, API_URL })))
      .then(r => r.json())
      .then(response => this.setState({ response }));

  public componentDidMount() {
    if (Object.keys(this.props.data).length !== 0) {
      this.fetchShabad(this.props.data.shabadid);
    }
  }

  public componentDidUpdate(prevProps: ViewerProps) {
    if (prevProps.data.shabadid !== this.props.data.shabadid) {
      this.fetchShabad(this.props.data.shabadid);
    }
  }

  public render() {
    const {
      props: { namespaceString, data },
      state: { response },
    } = this;

    if (Object.keys(data).length === 0) {
      return <h4>{TEXTS.SYNC_CONNECTED(namespaceString)}</h4>;
    }

    if (response !== null) {
      return (
        <ShabadContent
          type="shabad"
          highlight={data.highlight}
          gurbani={response.gurbani}
          info={response.shabadinfo}
        />
      );
    }

    return <div className="spinner" />;
  }
}
