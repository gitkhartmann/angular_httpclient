import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, throwError } from "rxjs";

export class Todo {
	completed!: boolean;
	title!: string;
	id?: number
}

@Injectable({ providedIn: 'root' })

export class TodosService {
	constructor(private http: HttpClient) { }


	addTodo(todo: Todo): Observable<Todo> {
		const headers = new HttpHeaders({
			'MyCustomHeaders': Math.random().toString()
		})
		return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, { headers })
	}
	fetchTodos(): Observable<Todo[]> {
		return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
			params: new HttpParams().set('_limit', 4)

		})
			.pipe(

				delay(1500),
				catchError(() => {
					return throwError((error: any) => console.log('Error: ', error.message))
				})
			)

	}
	removeTodo(id: number | undefined): Observable<void> {
		return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
	}
	completeTodo(id: number | undefined): Observable<Todo> {
		return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			completed: true
		})
	}
}