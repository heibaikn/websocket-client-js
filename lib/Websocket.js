// import { mapActions, mapState } from "vuex";
// import Defer from "./Promise";
import Defer from 'promise-simple-class'
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
  create(cb) {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      console.log("WebSocket 建立连接成功!");
      cb && cb();
    };
    this.socket.onmessage = event => {
      console.log(event);
      this.handleAc(JSON.parse(event.data));
    };
    this.socket.onerror = () => {
      console.log("WebSocket 错误!");
      this.error && this.error();
    };
    this.socket.onclose = () => {
      console.log("WebSocket 关闭!");
      this.close && this.close();
    };
  }
  request(ac, data, cb) {
    // console.log(object);
    let defer = new Defer();
    this.acSet[ac] = [false, defer];
    this.socket.send(JSON.stringify(data));
    return defer.promise;
  }
  on(ac, data, cb) {
    let defer = new Defer();
    this.acSet[ac] = [true, defer];
    this.socket.send(JSON.stringify(data));
    return defer.promise;
  }
  off(ac) {
    delete this.acSet[ac];
  }
  handleAc(data) {
    let item = this.acSet[data.ac];
    if (item) {
      item[1].resolve(data);
      !item[0] && delete this.acSet[data.ac];
    }
    console.log(this.acSet);
  }
  sendMessage(data) {}
}
export default new WebSocketImpt();
