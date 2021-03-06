import { Todo } from './../todo';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fadeIn', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(500, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(500, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})
export class TodoListComponent implements OnInit {

  title= " Todo List";
  tasks : Todo[];
  taskTitle:string;
  savedId:any;
  idTodo;
  beforeEditCashe: string;
  myDate= Date.now();
  constructor() {
    let savedTasks= localStorage.getItem('tasksTodo');
    this.savedId=JSON.parse(localStorage.getItem('taskid'));
    // console.log(this.savedId)
    if (savedTasks) {
      this.tasks=JSON.parse(savedTasks)
    }
    else  this.tasks=  [
      {
        'id': 0,
        'title': 'courses',
        'completed': false,
        'editing': false,
      }
    ];
   }

  ngOnInit() {
    this.beforeEditCashe='';
    if (this.savedId== null) {
      this.idTodo= 1
    }
    else {
      this.idTodo=this.savedId;
    }
    this.taskTitle='';
    this.saveId();
    this.saveall()
  }
  todo() {
    if(this.taskTitle.trim().length===0) {
      return
    }
    
    this.tasks.push({
      'id': this.idTodo,
      'title': this.taskTitle,
      'completed': false,
      'editing': false
    })

    this.taskTitle ='';
    this.idTodo++;
    this.saveall();
  }
  deleteTodo(id: number): void {
    if(this.tasks.length==1) {
      return;
    }
    else {
      this.tasks = this.tasks.filter(todo => todo.id !== id);
      this.saveall();
    }  
    this.saveId()
  }
  
  remainingTasks() {
    return this.tasks.filter(todo => !todo.completed).length;
  }

  inProgressTasks() {
    return this.tasks.map(todo => todo.completed).length;
  }

  saveall() {
    localStorage.setItem('tasksTodo',JSON.stringify(this.tasks));
    this.saveId()
  }

  saveId() {
    localStorage.setItem('taskid',JSON.stringify(this.idTodo))
  }
  editTask(task: Todo): void {
    this.beforeEditCashe= task.title
    task.editing= true
  }
  doneEdit (task : Todo): void {
    if(task.title.trim().length===0) {
      task.title= this.beforeEditCashe
   }
    task.editing= false
  }
  cancelEdit (task : Todo): void {
    task.title= this.beforeEditCashe   
    task.editing= false
  }
}
