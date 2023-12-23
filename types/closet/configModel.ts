export class configLocation {
    id: string
    name: string
    sort: string
    types:closetType[]
}

export class closetType {
    id: string
    name: string
    location: string
}