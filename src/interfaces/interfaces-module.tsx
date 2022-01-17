export interface IUserData {
    id: string,
    useremail: string,
    userlogin: string,
    userlvl: number,
    userrole: string,
    userxp: number
}

export interface INewsData {
    authorId: string,
    author: string,
    title: string,
    urlToImage: string,
    content: string,
    createdAt: string,
}

export interface IChatMessage {
    userlogin: string,
    useremail: string,
    message: string,
    createAt: string
}