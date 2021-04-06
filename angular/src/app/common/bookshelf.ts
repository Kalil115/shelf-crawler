import { BookshelfItem } from "./bookshelf-items";

export class Bookshelf {

    id: number;
    name: string;
    userId: number;
    goal: number;
    reachRate: number;
    bookshelfItems: BookshelfItem[];

}
