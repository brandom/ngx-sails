import 'socket.io-client';

import { InjectionToken } from '@angular/core';
import * as io_ from 'socket.io-client';

export type SocketIOSocket = SocketIOClient.Socket;
export type SocketIOConnectOpts = SocketIOClient.ConnectOpts;

export let IO_INSTANCE = new InjectionToken<any>('io.instance');

const io: any = (<any>io_).default || io_;

export { io };
