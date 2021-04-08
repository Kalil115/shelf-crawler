import { Book } from "./book";

export class BookshelfItem {

    id: number;
    book: Book;
    comment: string;
    rating: number;
    reason: string;
    status: string;
    dateCreated: Date;
    lastUpdated: Date;

}
