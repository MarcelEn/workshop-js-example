import { getAvailableInterfaces } from './shared';
import { flatten } from 'lodash';
import { question } from 'readline-sync';
import { Socket, TcpNetConnectOpts } from 'net';

const addresses = flatten(getAvailableInterfaces().map(e => e.addresses));
addresses.forEach((a, i) => console.log(`${i} ${a.address}`))
const index = parseInt(question("Select interface: "));
const address = addresses[index];
console.log(`${address.address} selected`)

const port = parseInt(question("Enter port: "));

const message = question("Enter message: ")

const socket = new Socket()
socket.setEncoding('UTF-8')

const options: TcpNetConnectOpts = {
    port,
    host: address.address
}

socket.connect(options, () => {
    socket.write(`${message}\n`);
})


socket.on('data', data => {
    console.log(data)
    socket.destroy();
})