import 'socket.io-client';
import 'sails.io.js';

import { InjectionToken } from '@angular/core';
import * as io_ from 'socket.io-client';
import * as sailsIO_ from 'sails.io.js';

const sailsIO: any = (<any>sailsIO_).default || sailsIO_;

const io = sailsIO(io_);

io.sails.autoConnect = false;

export type SocketIOSocket = sailsIO_.Socket;

export type SocketIOConnectOpts = Partial<sailsIO_.ClientSails>;

export let IO_INSTANCE = new InjectionToken<any>('io.instance');

export { io };
