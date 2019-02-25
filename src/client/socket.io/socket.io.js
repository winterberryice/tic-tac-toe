import { store } from '../redux/store';
import io from 'socket.io-client';
const PORT = process.env.PORT || 5000;
const socket = io('https://tic-tac-toe-oxo.herokuapp.com:' + PORT);

socket.on('CELL_CLICK', msg => {
  store.dispatch({ type: 'CELL_CLICK', id: msg });
});

socket.on('NEW_GAME', () => {
  store.dispatch({ type: 'NEW_GAME' });
});

const emitToRoom = (event, ...args) => {
  const inputRoom = store.getState().connection.inputRoom;

  if (inputRoom !== '') {
    socket.emit(event, inputRoom, ...args);
  }
};

export { socket, emitToRoom };
