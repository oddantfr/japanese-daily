import {LitElement, html} from 'lit';
import {when} from 'lit/directives/when.js';
import {customElement} from 'lit/decorators.js';
import {withStyles} from 'lit-with-styles';
import {ReactiveController, withController} from '@snar/lit';
import {state} from 'snar';
import {Todo, todos} from '../todo.js';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
// import styles from './app-shell.css?inline';
import {MdCheckbox} from '@material/web/checkbox/checkbox.js';
import {MdListItem} from '@material/web/list/list-item.js';
import {MdIconButton} from '@material/web/iconbutton/icon-button.js';

@saveToLocalStorage('japan-daily:todos')
class TodoStore extends ReactiveController {
	@state() today = Date.now();
	@state() todos: number[] = [];

	exists(todo: Todo) {
		return this.todos.findIndex((t) => t === todo.id) >= 0;
	}

	addTodo(todoId: number) {
		this.todos = [...this.todos, todoId];
	}
	removeTodo(todoId: number) {
		this.todos.splice(this.todos.indexOf(todoId) >>> 0, 1);
		this.requestUpdate();
	}

	getUndoneTodos() {
		return todos.filter((todo) => !this.todos.includes(todo.id));
	}
}

const todoStore = new TodoStore();

@customElement('app-shell')
@withController(todoStore)
@withStyles()
export class AppShell extends LitElement {
	render() {
		const undone = todoStore.getUndoneTodos();
		return html`
			<div>
				<md-filled-tonal-button
					class="m-4"
					@click=${(event: PointerEvent) => {
						const randomIndex = Math.floor(Math.random() * undone.length);
						const todo = undone[randomIndex];
						const checkbox = this.renderRoot.querySelector(
							`#checkbox-${todo.id}`
						) as MdCheckbox;
						checkbox.click();
					}}
					?disabled=${undone.length === 0}
				>
					<md-icon slot="icon">casino</md-icon>
					Random
				</md-filled-tonal-button>
			</div>
			<md-list>
				${todos.map((todo) => {
					return html`
						<md-list-item
							headline=${todo.name}
							class="cursor-pointer"
							@click=${(event: PointerEvent) => {
								const target = event.target as MdListItem;
								const checkbox = target.querySelector(
									'md-checkbox'
								) as MdCheckbox;
								// checkbox.checked = !checkbox.checked;
								checkbox.click();
							}}
						>
							<md-checkbox
								id="checkbox-${todo.id}"
								@click=${(event: PointerEvent) => {
									event.stopPropagation();
								}}
								slot="start"
								?checked=${todoStore.exists(todo)}
								class="ml-5"
								@change=${(event: Event) => {
									const target = event.target as MdCheckbox;
									if (target.checked) {
										todoStore.addTodo(todo.id);
										if (todo.url) {
											window.open(todo.url, '_blank');
										}
									} else {
										todoStore.removeTodo(todo.id);
									}
								}}
							></md-checkbox>

							${when(
								todo.url,
								() => html`
									<md-icon-button
										slot="end"
										@click=${(event: PointerEvent) => {
											event.stopPropagation();
											const target = event.target as MdIconButton;
											const listItem = target.parentElement as MdListItem;
											const checkbox = listItem.querySelector('md-checkbox')!;
											if (!checkbox.checked) {
												checkbox.click();
											} else {
												if (todo.url) {
													window.open(todo.url, '_blank');
												}
											}
										}}
									>
										<md-icon>open_in_new</md-icon>
									</md-icon-button>
								`
							)}
						</md-list-item>

						<!-- <md-divider inset></md-divider> -->
					`;
				})}
			</md-list>
		`;
	}
}
