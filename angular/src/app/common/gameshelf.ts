import { GameshelfItem } from "./gameshelf-item";

export class Gameshelf {

    id: number;
    name: string;
    userId: number;
    goal: number;
    reachRate: number;
    gameshelfItems: GameshelfItem[];

}
