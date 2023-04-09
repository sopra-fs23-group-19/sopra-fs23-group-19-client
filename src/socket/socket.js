import SockJsClient from "react-stomp";
import { getDomain } from "helpers/getDomain";

const Socket = (props) => {
  return (
    <SockJsClient
      url={getDomain() + "/sopra-group19-websocket"}
      // url={
      //   "ws://sopra-fs23-group-19-server.oa.r.appspot.com/sopra-group19-websocket"
      // }
      topics={["/topic" + props.topics]}
      onMessage={(msg) => props.onMessage(msg)}
    />
  );
};
export default Socket;
