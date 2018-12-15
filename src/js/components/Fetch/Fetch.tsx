import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS } from '@/constants';

export interface IFetchProps {
  transform: (r: Response) => Promise<any>;
  url: string;
  children: (
    options: { data: any; loading: boolean; error: any }
  ) => React.ReactNode;
  options: RequestInit;
  timeout: number;
}

interface IFetchState {
  loading: boolean;
  res: Response | null;
  data: any | null;
  error?: any | null;
}

export default class Fetch extends React.PureComponent<
  IFetchProps,
  IFetchState
> {
  public static defaultProps = {
    transform: (r: Response) => r.json(),
    options: {},
    timeout: 10000,
  };

  public static propTypes = {};

  public state = {
    loading: true,
    res: null,
    data: null,
    error: null,
  };

  private mounted = false;

  private safeSetState = (state: Partial<IFetchState>, cb?: () => void) => {
    if (this.mounted) {
      this.setState(state as IFetchState, cb);
    }
  };

  public componentDidMount() {
    this.mounted = true;
    const { url, options, transform, timeout } = this.props;

    this.fetchData(url, options, transform, timeout);
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public componentDidUpdate(prevProps: IFetchProps) {
    const { url, options, transform, timeout } = this.props;

    if (
      prevProps.url !== url ||
      prevProps.options !== options ||
      prevProps.transform !== transform
    ) {
      this.fetchData(url, options, transform, timeout);
    }
  }

  public fetchData = (
    url: IFetchProps['url'],
    options: IFetchProps['options'],
    transform: IFetchProps['transform'],
    timeout = Fetch.defaultProps.timeout
  ) => {
    this.safeSetState({ loading: true });

    const timeoutPromise = new Promise<Response>((resolve, reject) => {
      setTimeout(reject, timeout, TEXTS.TIMEOUT_ERROR);
    });

    // If timeoutPromise completes before fetch the top level catch is executed
    return Promise.race([timeoutPromise, fetch(url, options)])
      .then(res =>
        transform(res)
          .then(data =>
            this.safeSetState({
              loading: false,
              res,
              data,
              error: null,
            })
          )
          .catch(error =>
            this.safeSetState({
              loading: false,
              res,
              data: null,
              error,
            })
          )
      )
      .catch(error =>
        this.safeSetState({
          loading: false,
          data: null,
          error,
        })
      );
  };

  public render() {
    return this.props.children(this.state);
  }
}
