import * as SockJS from 'sockjs-client';
import { Client, Frame, over } from 'webstomp-client';
import { getToken } from '../../../shared/helpers';
import urlAppender from '../../../shared/helpers/urlAppender';


export function socketFactory(successCallback,errorCallback) {
    const webSocket = new SockJS(urlAppender('/vrp-websocket')) 
    
    var stompClient = over(webSocket, {
        debug: true,
        // Because webstomp first reads ws.protocol:
        // https://github.com/JSteunou/webstomp-client/blob/1.2.6/src/client.js#L152
        // but SockJS doesn't specify it:
        // https://github.com/sockjs/sockjs-client/blob/v1.3.0/lib/main.js#L43
        // so finally this will be used to set accept-version header to '1.2' (verify in browser console):
        // (see also https://github.com/JSteunou/webstomp-client/issues/75)
        protocols: ['v12.stomp'],
      });
      
      stompClient.connect(
        {"Authorization": `Bearer ${getToken()}`}, // no headers
        successCallback,
        errorCallback,
      );
     return stompClient
}
