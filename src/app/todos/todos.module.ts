import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";

import {TodosComponent} from "src/app/todos/components/todos/todos.component";
import {HeaderComponent} from "src/app/todos/components/header/header.component";
import {TodosService} from "src/app/todos/components/services/todos.service";
import {MainComponent} from "src/app/todos/components/main/main.component";
import {TodoComponent} from "src/app/todos/components/todo/todo.component";
import {FooterComponent} from "./components/footer/footer.component";

const routes: Routes = [{
  path: '',
  component: TodosComponent
}]

@NgModule({
  declarations: [TodosComponent, HeaderComponent, MainComponent, TodoComponent, FooterComponent],
  imports: [RouterModule.forChild(routes), AsyncPipe, JsonPipe, CommonModule],
  providers: [TodosService]
})
export class TodosModule {}
