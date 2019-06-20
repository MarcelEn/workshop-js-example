import { getAvailableInterfaces } from './shared';
import {question} from 'readline-sync';
import createListeners from './Listener';

const port = parseInt(question('Enter port: '));
getAvailableInterfaces().map(address => createListeners(address, port))
// Lazy way
console.log("Ctrl + C to exit")