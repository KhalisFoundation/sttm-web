type Socket = {
  on: (event: string, cb: (...args: any[]) => void) => void;
  disconnect: () => void;
};

// tslint:disable-next-line
interface Window {
  io: (path: string) => Socket;
}

declare var BANIS_API_URL: string;
declare var SYNC_API_URL: string;
declare var API_URL: string;
declare var window: Window;
