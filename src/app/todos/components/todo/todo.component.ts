import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {TodoInterface} from "../types/todo.interface";
import {TodosService} from "../services/todos.service";

@Component({
  templateUrl: './todo.component.html',
  selector: 'app-todos-todo'
})
export class TodoComponent implements OnInit,OnChanges {
  @Input('todo') todoProps!: TodoInterface
  @Input('isEditing') isEditingProps!: boolean

  @Output('setEditingID') setEditingIDEvent: EventEmitter<string | null> = new EventEmitter<string | null>()

  @ViewChild('textInput') textInput!: ElementRef

  editingText: string = '';

  constructor(private todoService: TodosService) {}

  ngOnInit() {
    this.editingText = this.todoProps.text
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["isEditingProps"].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus()
      }, 0)
    }
  }

  setTodoInEditMode():void {
    this.setEditingIDEvent.emit(this.todoProps.id)
  }

  removeTodo():void {
    this.todoService.removeTodo(this.todoProps.id)
  }

  toggleTodo():void {
    this.todoService.toggleTodo(this.todoProps.id)
  }

  changeTodo():void {
    this.todoService.changeTodo(this.todoProps.id, this.editingText)
    this.setEditingIDEvent.emit(null)
  }

  changeText($event: KeyboardEvent):void {
    const value = ($event.target as HTMLInputElement).value
    this.editingText = value
  }
}
