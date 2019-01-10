import React from 'react';

import { TEXTS } from '@/constants';

const defaultProps = {
  options: {},
  timeout: 10000,
};

interface IFetchState {
  loading: boolean;
  res: Response | {} | null;
  data: any;
  error: any;
}

export interface IFetchProps extends Required<typeof defaultProps> {
  transform?: (res: Response) => Promise<any>;
  url: string;
  children: (options: IFetchState) => React.ReactNode;
  options: {};
  timeout: number;
}

// This component uses children as a function pattern
export default class Fetch extends React.PureComponent<
  IFetchProps,
  IFetchState
> {
  public static defaultProps = defaultProps;

  public state = {
    loading: true,
    res: null,
    data: null,
    error: null,
  };

  private mounted = false;
  private setStateSafely = (state: Partial<IFetchState>, cb?: () => void) =>
    this.mounted && this.setState(state as IFetchState, cb);

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
    transform: IFetchProps['transform'] = (r: Response) => r.json(),
    timeout: IFetchProps['timeout'] = Fetch.defaultProps.timeout
  ) => {
    this.setStateSafely({ loading: true });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(reject, timeout, TEXTS.TIMEOUT_ERROR)
    );

    // If timeoutPromise completes before fetch the top level catch is executed
    return Promise.race([timeoutPromise, fetch(url, options)])
      .then(res =>
        transform(res as Response)
          .then(data =>
            this.setStateSafely({
              loading: false,
              res,
              data,
              error: null,
            })
          )
          .catch(error =>
            this.setStateSafely({
              loading: false,
              res,
              data: null,
              error,
            })
          )
      )
      .catch(error =>
        this.setStateSafely({
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
