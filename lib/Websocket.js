class WebSocketImpt {
  constructor() {
    this.url = "ws://123.207.167.163:9010/ajaxchattest";
    this.socket;
    this.success;
    this.error;
    this.close;
    //
    this.acSet = {};
  }
  create(obj, cb) {
    this.socket = new WebSocket(obj.url);
    this.socket.onopen = () => {
      console.log("WebSocket 建立连接成功!");
      cb && cb();
    };
    this.socket.onmessage = event => {
      this.handleAc(JSON.parse(event.data));
    };
    this.socket.onerror = () => {
      this.error && this.error();
    };
    this.socket.onclose = () => {
      this.close && this.close();
    };
  }

  oncallback(ac, cb) {
    this.acSet[ac] = [true, cb];
  }
  off(ac) {
    delete this.acSet[ac];
  }
  handleAc(data) {
    let item = this.acSet[data.status];
    if (data.err) {
      this.acSet["err"][1](data);
      return;
    }
    if (item) {
      item[1](data);
      !item[0] && delete this.acSet[data.ac];
    }
  }
  sendMessage(data) {
    this.socket.send(JSON.stringify(data));
  }
}
export default new WebSocketImpt();
