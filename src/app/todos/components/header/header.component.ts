import {Component} from "@angular/core";
import {TodosService} from "../services/todos.service";

@Component({
  templateUrl: './header.component.html',
  selector: 'app-todos-header'
})
export class HeaderComponent {
  text: string = '';

  constructor(private todoService: TodosService) {
    this.todoService.todos$
      .subscribe(todos => {
        console.log('todos: ', todos)
      })
  }

  changeText($event: KeyboardEvent):void {
    const target = $event.target as HTMLInputElement
    this.text = target.value
  }

  addTodo():void {
    this.todoService.addTodo(this.text)
    this.text = ''
  }
}
