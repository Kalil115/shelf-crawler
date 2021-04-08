import { TvSeries } from "./tvSeries";

export class TvshelfItem {
    id: number;
    tvSeries: TvSeries;
    comment: string;
    rating: number;
    reason: string;
    status: string;
    dateCreated: Date;
    lastUpdated: Date;

}
