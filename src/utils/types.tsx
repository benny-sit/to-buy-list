export type listLoginType = {
    name: string,
    password: string,
  } | undefined

export type ListItemType = {
    _id: string,
    name: string,
    qty: number,
    updatedAt: string,
}

export type ListType = {
    _id: string,
    name: string,
    password: string,
    items: ListItemType[],
    updatedAt: string,
}