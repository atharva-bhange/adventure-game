import ItemType from "types/ItemsType";

export interface option {
	title: string;
	newState?: Partial<Record<ItemType, boolean>>;
	nextNodeId?: number;
	required?: ItemType[];
}

interface Node {
	title: string;
	defaultNextNode?: number;
	options: option[];
}

interface GameType {
	[key: number]: Node;
}

export default GameType;
