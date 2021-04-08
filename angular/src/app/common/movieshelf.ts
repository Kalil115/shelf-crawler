import { MovieshelfItem } from "./movieshelf-item";

export class Movieshelf {

    id: number;
    name: string;
    userId: number;
    goal: number;
    reachRate: number;
    movieshelfItems: MovieshelfItem[];

}
