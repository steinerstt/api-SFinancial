export interface iCreateTransaction {
    name: string,
    value: number,
    type: string,
    transaction_date: string
}

export interface iReturnTransaction {
    id: string,
    name: string,
    value: number,
    type: string,
    transaction_date: string,
    user: {
        id: string
    },
    created_at: Date,
    updated_at: Date
}

export interface iUpdateTransaction {
    name?: string,
    value?: number,
    type?: string,
    transaction_date?: string
}