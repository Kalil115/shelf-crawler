import { Tv } from "./tv";

export class TvshelfItem {
    id: number;
    tv: Tv;
    comment: string;
    rating: number;
    reason: string;
    status: string;
    dateCreated: Date;
    lastUpdated: Date;

}
