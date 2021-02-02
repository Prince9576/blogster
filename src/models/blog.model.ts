export interface Blog {
    id: string,
    title: string,
    content: string,
    authorRef: string,
    author: string,
    like: number,
    timestamp: Date,
    liked?: boolean,
    likedBy?: string[] 
}