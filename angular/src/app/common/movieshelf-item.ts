import { Movie } from "./movie";

export class MovieshelfItem {

    id: number;
    movie: Movie;
    comment: string;
    rating: number;
    reason: string;
    status: string;
    dateCreated: Date;
    lastUpdated: Date;
}
