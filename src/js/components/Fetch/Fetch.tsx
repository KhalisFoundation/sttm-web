import React from 'react';
import { TEXTS } from '@/constants';

export type FetchState = Partial<{
  loading: boolean;
  res: Response | null;
  data: any;
  error: any;
}>;

type FetchProps = {
  transform: (r: Response) => any;
  url: string;
  children: (s: FetchState) => React.ReactType;
  options: {};
  timeout: number;
};
// This component uses children as a function pattern
export default class Fetch extends React.PureComponent<FetchProps, FetchState> {
  public static defaultProps = {
    transform: (r: Response) => r.json(),
    options: {},
    timeout: 10000,
  };

  public state = {
    loading: true,
    res: null,
    data: null,
    error: null,
  };

  private mounted = false;

  private fetchData = (
    url: string,
    options: FetchProps['options'],
    transform: FetchProps['transform'],
    timeout = Fetch.defaultProps.timeout
  ) => {
    this.safelySetState({ loading: true });

    const timeoutPromise = new Promise((resolve, reject) =>
      setTimeout(reject, timeout, TEXTS.TIMEOUT_ERROR)
    );

    // If timeoutPromise completes before fetch the top level catch is executed
    return Promise.race([timeoutPromise, fetch(url, options)])
      .then(res =>
        transform(res)
          .then(data =>
            this.safelySetState({
              loading: false,
              res,
              data,
              error: null,
            })
          )
          .catch(error =>
            this.safelySetState({
              loading: false,
              res,
              data: null,
              error,
            })
          )
      )
      .catch(error =>
        this.safelySetState({
          loading: false,
          data: null,
          error,
        })
      );
  };

  private safelySetState = (state: FetchState, cb?: (() => void)) =>
    this.mounted && this.setState(state, cb);

  public componentDidMount() {
    this.mounted = true;
    const { url, options, transform, timeout } = this.props;

    this.fetchData(url, options, transform, timeout);
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public componentDidUpdate(prevProps: FetchProps) {
    const { url, options, transform, timeout } = this.props;

    if (
      prevProps.url !== url ||
      prevProps.options !== options ||
      prevProps.transform !== transform
    ) {
      this.fetchData(url, options, transform, timeout);
    }
  }

  public render() {
    return this.props.children(this.state);
  }
}
