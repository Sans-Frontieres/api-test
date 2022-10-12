import Roles from "../enum"

// type BlockCanDoAction = (req: Request) => Promise<any>

// export type CanDoAction = (req: Request, res: Response, next: NextFunction, callback: BlockCanDoAction) => Promise<any>

export interface TaskProps {
    id: string,
    title: string,
    description: string
    author_id: string
}

export interface UserProps {
    id: string,
    username: string,
    email: string,
    password: string,
    roles: Roles[]
}