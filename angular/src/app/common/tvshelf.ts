import { TvshelfItem } from "./tvshelf-item";

export class Tvshelf {

    id: number;
    name: string;
    userId: number;
    goal: number;
    reachRate: number;
    tvshelfItems: TvshelfItem[];

}
