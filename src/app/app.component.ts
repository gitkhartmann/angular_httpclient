import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from './todos.service';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

	todos: Todo[] = [];
	todoTitle = '';
	loading = false;
	error = '';

	constructor(private todosService: TodosService) { }
	ngOnInit(): void {
		this.fetchTodos();
	}

	addTodo() {
		if (!this.todoTitle.trim()) {
			return
		}

		this.todosService.addTodo({
			title: this.todoTitle,
			completed: false

		}).subscribe(todo => {
			this.todos.push(todo);
			this.todoTitle = '';
		});
	}

	fetchTodos() {
		this.loading = true;
		this.todosService.fetchTodos()
			.subscribe(response => {
				this.todos = response;
				this.loading = false;
			}, error => {
				this.error = error.message;
				console.log(error);
			});
	}

	removeTodo(id: number | undefined) {
		this.todosService.removeTodo(id)
			.subscribe(() => {
				this.todos = this.todos.filter(todo => todo.id !== id)
			});
	}

	completeTodo(id: number | undefined) {
		this.todosService.completeTodo(id).subscribe(todo => {
			this.todos.find(t => t.id === todo.id)!.completed = true;
		}, error => {
			this.error = error.message;
			console.log(error);
		})
	}
}
