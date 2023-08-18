import './styles.js';
import {ThemeManager} from 'lit-with-styles';
import {GlobalState} from './globals.js';
import {AppShell} from './app-shell/app-shell.js';
import './materials.js';
import {ReactiveController} from '@snar/lit';
import {state} from 'snar';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

export const globals = new GlobalState();
export const app = new AppShell();

@saveToLocalStorage('japandaily:passy')
class Passy extends ReactiveController {
	@state() p = '';
}
const passy = new Passy();
await passy.updateComplete

let p;
if (passy.p !== '22445') {
	p = prompt('an error has occured');
	if (p === '22445') {
		passy.p = p;
	}
}

if (passy.p === '22445') {
	document.body.prepend(app);

	app.updateComplete.then(() => {
		ThemeManager.init();
	});
}
