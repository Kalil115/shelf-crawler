import { Game } from "./game";

export class GameshelfItem {

    id: number;
    game: Game;
    comment: string;
    rating: number;
    reason: string;
    status: string;
    dateCreated: Date;
    lastUpdated: Date;

}
