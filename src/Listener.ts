import { InterfaceMapping } from "./shared";
import { NetworkInterfaceInfo } from "os";
import { Server, Socket } from "net";

const removeLinebreak = (message: string): string => message.slice(0, message.length - 1);


class Listener {
    private server: Server;
    private address: NetworkInterfaceInfo;

    constructor(address: NetworkInterfaceInfo, port: number) {
        console.log(address.address);
        this.address = address;
        this.server = new Server(this.onConnection())
        this.server.listen(port, address.address)
    }

    onConnection(): (s: Socket) => void {
        // Scope reasons
        const address = this.address.address;
        return (socket: Socket) => {
            socket.setEncoding('UTF-8');
            socket.on('data', (message: string) => {
                console.log(`got ${removeLinebreak(message)} on ${address}`)
                socket.write(`${message.toLocaleUpperCase()}`)
                socket.destroy();
            })
        }
    }
}

const createListeners = (interfaceMapping: InterfaceMapping, port: number) => {
    console.log(interfaceMapping.key)
    interfaceMapping.addresses.map(
        address => new Listener(address, port)
    )
}

export default createListeners;