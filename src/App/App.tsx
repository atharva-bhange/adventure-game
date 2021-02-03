import React, { useState } from "react";

import "./App.scss";
import ItemType from "types/ItemsType";
import { option } from "types/GameType";
import Game from "Game";

const App: React.FC = () => {
	const [inventory, setInventory] = useState<Record<ItemType, boolean>>({
		Flashlight: false,
		Gun: false,
	});

	const [nodeId, setNodeId] = useState<number>(1);

	const node = Game[nodeId];

	const onOptionClick = (idx: number) => {
		const thisOption = node.options[idx];
		setInventory({ ...inventory, ...thisOption.newState });
		if (node.defaultNextNode) {
			setNodeId(node.defaultNextNode);
		} else if (thisOption.nextNodeId) {
			setNodeId(thisOption.nextNodeId);
		}
	};

	const checkIsDisabled = (option: option) => {
		let isDisabled = false;
		if (option.required) {
			option.required.forEach((item) => {
				if (!inventory[item]) {
					isDisabled = true;
				}
			});
		}
		if (isDisabled) return "disabled";
		else return "";
	};

	const renderInventory = () => {
		let list = "";
		for (let key in inventory) {
			const k = key as keyof typeof inventory;
			if (inventory[k]) {
				list += `${key}, `;
			}
		}
		return list.slice(0, list.length - 2);
	};

	return (
		<div className="app">
			<div className="question">{node.title}</div>
			<div className="options">
				{node.options.map((option, index) => (
					<button
						className={checkIsDisabled(option)}
						key={index}
						onClick={() => onOptionClick(index)}
					>
						{option.title}
					</button>
				))}
			</div>
			<div className="inventory">Inventory : {renderInventory()}</div>
		</div>
	);
};

export default App;
