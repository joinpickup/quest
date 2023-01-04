export function isTokenValid(token: string) {
    const decoded_token = parseJWT(token)
    return decoded_token.exp * 1000 >= Date.now()
}

function parseJWT(token: string)  {
    return JSON.parse(Buffer.from(token.split(".")[1],"base64").toString('binary'));
}

export interface RegistryItem {
    endpoint: string
    name: string
}

export class ServiceInstance {
    base: string;
    private token: string;

    constructor(base: string, token: string) {
        this.base = base;
        this.token = token;
    }

    newRequest<T>(request: string, endpoint: string, data?: any): Promise<T> {
        let parsedURL = new URL(endpoint, this.base)
        return fetch(parsedURL.toString(), {
            method: request,
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Accept": "application/json",
                "User-Agent": this.base,
                "Content-Type": "application/json"
            },
            body: data ? JSON.stringify(data) : null
        }).then(async response => {
            if (!response.ok) {
                return Promise.reject(await response.text())
            }
            return response.json()
        })
    }
}

export class Middleware {
    token: string;
    private serviceReg: ServiceInstance

    constructor(token: string) {
        this.token = token
        // TODO: fix error handling
        this.serviceReg = new ServiceInstance(process.env.SERVICE_REGISTRY as string, token)
    }

    async newInstance(name: string): Promise<ServiceInstance> {
        let item = await this.serviceReg.newRequest<RegistryItem>("GET", `/v1/item/${name}`).catch(err => {
            return Promise.reject(err)
        })
        if (item) {
            return new ServiceInstance(item.endpoint, this.token)
        } else {
            return Promise.reject("Internal Server Error")
        }
    }
}