import 'socket.io-client';
import 'sails.io.js';

import { InjectionToken } from '@angular/core';
import * as io_ from 'socket.io-client';
import * as sailsIO_ from 'sails.io.js';

const sailsIO: any = (<any>sailsIO_).default || sailsIO_;

const io = sailsIO(io_);

io.sails.autoConnect = false;

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export type SocketIOSocket = sailsIO_.Socket;

export type SocketIOConnectOpts = Omit<sailsIO_.ClientSails, 'connect'>;

export let IO_INSTANCE = new InjectionToken<any>('io.instance');

export { io };
