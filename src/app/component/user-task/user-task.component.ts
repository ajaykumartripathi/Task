import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {

  userForm!: FormGroup;
  taskForm!: FormGroup;
  // Here Making id For user and Task
  idIncrement: any = 2;
  taskIdIncrement: any = 2;

  user_id: any
  task_id: any

  isTaskEdit: boolean = false;
  isUserEdit: boolean = false;

  // making userlist with task
  userList: any = [
    {
      id: 1,
      name: "user1",
      taskList: [
        {
          id: 1,
          taskname: "task1"
        },
        {
          id: 2,
          taskname: "task2"
        }

      ]
    },
    {
      id: 2,
      name: "user2",
      taskList: [
        {
          id: 1,
          taskname: "task1"
        }, {
          id: 2,
          taskname: "task2"
        },
      ]
    },
  ];

  constructor() {

  }
  ngOnInit(): void {
    // making form for user and task
    this.userForm = new FormGroup({
      username: new FormControl("")
    });

    this.taskForm = new FormGroup({
      taskName: new FormControl("")
    });
  }
  
  // this is submit button for user add and edit
  onSubmit() {
    let view = {
      id: 0,
      name: "",
      taskList: []
    }
    this.idIncrement += 1;
    if (this.isUserEdit) {
      this.userList.forEach((element: any) => {
        if (element.id == this.user_id) {
          element.name = this.userForm.value.username;
        }
      });
    }
    else {
      view.id = this.idIncrement;
      view.name = this.userForm.value.username
      this.userList.push(view)
      this.userForm.reset()

    }
  }

  // this is the task drag and drop method
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // here is task add method
  onAddTask() {
    this.taskIdIncrement += 1;
    let task = {
      id: 0,
      taskname: ""
    }
    if (this.isTaskEdit) {
      this.userList.forEach((element: any) => {

        if (element.id == this.user_id) {
          element.taskList.forEach((val: any) => {
            if (val.id == this.task_id) {
              console.log(val)
              val.taskname = this.taskForm.value.taskName;
            }
          });
        }

      });
    }
    else {
      this.userList.forEach((element: any) => {

        if (element.id == this.user_id) {
          task.id = this.taskIdIncrement
          task.taskname = this.taskForm.value.taskName;
          element.taskList.push(task);
          this.taskForm.reset()

        }

      });
    }
  }

  // this is the method for getting userid
  OnTaskGetId(id: any) {
    this.user_id = id
    this.isTaskEdit = false
    this.taskForm.reset()
  }

  // for delete user
  onDeleteUser(id: any) {
    this.userList.splice(id, 1);
  }

// setting value for task edit
  OnTaskEdit(userId: any, taskId: any) {
    this.task_id = taskId;
    this.user_id = userId;
    this.isTaskEdit = true;
    this.userList.forEach((element: any) => {
      if (element.id == userId) {
        element.taskList.forEach((val: any) => {
          if (val.id == taskId) {
            this.taskForm.controls['taskName'].setValue(val.taskname)
          }
        });
      }
    });
  }

  // setting value for useredit
  OnuserEdit(userId: any) {
    this.user_id = userId;
    this.isUserEdit = true;

    this.userList.forEach((element: any) => {

      if (element.id == userId) {
        this.userForm.controls['username'].setValue(element.name)
      }

    });

  }
  
  onUserAdd() {
    this.isUserEdit = false
    this.userForm.reset()
  }

}
