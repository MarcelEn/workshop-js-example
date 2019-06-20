import { networkInterfaces, NetworkInterfaceInfo } from 'os';

export interface InterfaceMapping {
    key: string
    addresses: NetworkInterfaceInfo[]
}

export const getAvailableInterfaces = (): InterfaceMapping[] => {
    const interfaces = networkInterfaces();
    const result: InterfaceMapping[] = [];

    Object.keys(interfaces).map(key => {
        result.push({
            key,
            addresses: (interfaces[key] as NetworkInterfaceInfo[])
                .filter(address => address.family === 'IPv6')
                .map(address => ({ 
                    ...address,
                    address: address.address += `%${key}` 
                }))
        })
    })

    return result;
}