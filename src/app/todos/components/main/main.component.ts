import {Component} from "@angular/core";
import {combineLatest, every, map, Observable} from "rxjs";
import {TodoInterface} from "../types/todo.interface";
import {TodosService} from "../services/todos.service";
import {FilterEnum} from "../types/filter.enum";

@Component({
  templateUrl: './main.component.html',
  selector: 'app-todos-main'
})
export class MainComponent {
  visibleTodos$!: Observable<TodoInterface[]>
  noTodoClass$!: Observable<boolean>
  isAllTodosSelected$!: Observable<boolean>;
  editingID: string | null = null

  constructor(private todosService: TodosService) {
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map(todos => todos.every(todo => todo.isCompleted))
    )
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map(todos => todos.length === 0)
    )
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter(todo => !todo.isCompleted)
        } else if (filter === FilterEnum.completed) {
          return todos.filter(todo => todo.isCompleted)
        }
        return todos
      })
    )
  }

  toggleAllTodos($event: Event): void {
    const target = $event.target as HTMLInputElement
    this.todosService.toggleAll(target.checked)
  }

  setEditingID(editingID: string | null): void {
    this.editingID = editingID
  }
}
