export interface Todo {
	id: number;
	name: string;
	url?: string;
}

export const todos: Todo[] = [
	{
		id: 0,
		name: 'Kanji Practice',
		url: 'https://vdegenne.github.io/kanji-practice/index.html',
	},
	{
		id: 1,
		name: 'Japanese Numbers',
		url: 'https://japanese-numbers-training.web.app/',
	},
	{
		id: 2,
		name: 'Translation Practice',
		url: 'https://vdegenne.github.io/translation-analyzer/',
	},
	{
		id: 3,
		name: 'Japanese Words Memory Game',
		url: 'https://words-memory-game.web.app/',
	},
	{
		id: 4,
		name: 'Characters Memory Game',
		url: 'https://characters-memory-game.web.app/',
	},
	{
		id: 5,
		name: 'Hiragana Test',
		url: 'https://vdegenne.github.io/hiragana-test/',
	},
	{
		id: 6,
		name: 'Screenshots',
		url: 'https://oddantfr.github.io/screenshots/',
	},
];
