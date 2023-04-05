import { io } from "socket.io-client";
import { getDomain } from "helpers/getDomain";
const URL = getDomain();

export const socket = io(URL);
