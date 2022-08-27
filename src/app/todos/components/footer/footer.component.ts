import {Component} from "@angular/core";
import {TodosService} from "../services/todos.service";
import {map, Observable} from "rxjs";
import {FilterEnum} from "../types/filter.enum";

@Component({
  templateUrl: './footer.component.html',
  selector: 'app-todos-footer'
})
export class FooterComponent{
  noTodoClass$!: Observable<boolean>
  activeCount$!: Observable<number>
  itemsLeftText$!: Observable<string>
  filter$!: Observable<FilterEnum>
  filterEnum = FilterEnum

  constructor(private todosService: TodosService) {
    this.activeCount$ = this.todosService.todos$.pipe(
      map(todos => todos.filter(todo => !todo.isCompleted).length)
    )
    this.itemsLeftText$ = this.activeCount$.pipe(
      map(activeCount => `item${activeCount !== 1 ? 's' : ''} left`)
    )
    this.noTodoClass$ = todosService.todos$.pipe(
      map(todos => todos.length === 0)
    )
    this.filter$ = todosService.filter$
  }

  changeFilter($event: MouseEvent, filterName: FilterEnum): void {
    $event.preventDefault()
    this.todosService.changeFilter(filterName)
  }
}
