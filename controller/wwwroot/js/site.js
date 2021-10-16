// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


class Connection {

    data = [];

    _websocket;
    _isConnected = false;
    _ip = "";

    connect(ip) {
        if (this._websocket != null) {
            console.log("websocket already connected.");
            return;
        }
        this._ip = ip;
        this._websocket = new WebSocket(ip);
        this._websocket.onopen = this._onConnected;
        this._websocket.onerror = this._onError;
        this._websocket.onclose = this._onClose;
    }

    _onConnected(event) {
        this._isConnected = true;
        setInterval(this._onUpdate(), 10);
    }

    _onError(event) {
        console.log("websocket error: " + event.error);
        this._isConnected = false;
        this._websocket = null;
    }

    _onClose(event) {
        this._isConnected = false;
        this._websocket = null;
    }

    async _onUpdate() {
        console.log(Date.now());
    }
}

let connection = new Connection();
connection.connect("ws://localhost");