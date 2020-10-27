import * as SockJS from 'sockjs-client';
import { Client, Frame, over } from 'webstomp-client';
const headerClient = {"Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aHdhY2hzbWFubkB3YnAuY29tIiwiZXhwIjoxNjAwMzIzNjQwLCJpYXQiOjE2MDAzMDU2NDB9.eobDG4FmtiIv4FgN3jlsHKktGbx9muUlu5_leRC_M0VqGLjVZfi6C4MZXH8gkkUa_scIvW5och5eOqMCfbNjnA"}

export function socketFactory(successCallback,errorCallback) {
    const webSocket = new SockJS('https://wbp-bck.herokuapp.com/vrp-websocket') 

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
        headerClient, // no headers
        successCallback,
        errorCallback,
      );
     return stompClient
}
