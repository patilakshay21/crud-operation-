import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service'
import { HttpClient } from '@angular/common/http';
import { CommonModule,NgIf  } from '@angular/common';

@Component({
  selector: 'app-api-list',
  standalone: true,
  imports: [CommonModule,NgIf],
  templateUrl: './api-list.component.html',
  styleUrl: './api-list.component.css'
})
export class ApiListComponent implements OnInit {

  userList: any;

  constructor(private service:UserServiceService){}

  ngOnInit(): void {
    this. getapiData()
  }

  getapiData(){
    this.service.getUser().subscribe({
      next: (users: any)=>{
            this.userList = users
            console.log(`fetching usersData sucessfully`)
      },
      error: (error)=> console.log(`error fetching`, error)
    })
    
  }

  

}
