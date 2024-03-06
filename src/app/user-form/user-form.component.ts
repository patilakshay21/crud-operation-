import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../user-service.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {User} from "../../shared/models/user/model"
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  

  // empDetails = this.formBuilder.group({
  //   name :['', Validators.required],
  //   username:['', Validators.required],
  //     email:['', Validators.required],
  //     address:['', Validators.required]
      
  // })

  userDetails !: FormGroup;
  userObj : User = new User();
  userList : User[] = [];

  constructor(private formBuilder : FormBuilder, private userService : UserServiceService, private router:Router) { }

  ngOnInit(): void {
    // this.getAllUser()
    
    // data bindig here 
    this.userDetails = this.formBuilder.group({
      id:['', Validators.required],
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      address:['', Validators.required]
  })
}


// form fields validation
get id(){
  return this.userDetails.get(`id`)
}  
get firstname(){
  return this.userDetails.get(`firstname`)
}

get lastname(){
  return this.userDetails.get(`lastname`)
}

get email(){
  return this.userDetails.get(`email`)
}

get address(){
  return this.userDetails.get(`address`)
}


  addUser(){
    console.log(`add user`, this.userDetails)
    this.userObj.id = this.userDetails.value.id; 
    this.userObj.firstname = this.userDetails.value.firstname; 
    this.userObj.lastname = this.userDetails.value.lastname; 
    this.userObj.email = this.userDetails.value.email; 
    this.userObj.address = this.userDetails.value.address;
    
    this.userService.addUser(this.userObj).subscribe((res: any) =>{
      alert(`User added successfully`)
      if(!res){
        alert(`please add details`)
      }
    }, (error: any)=>{
      console.log(error)
    })
    this.router.navigate(['/userlist'])
  }

  // getAllUser(){
  //   console.log(`get all user`)
  //   this.userService.addUser(this.userDetails.value).subscribe((res: any) =>{
  //     this.getAllUser()
  //     console.log(`data added`,res)
  //   }, (error: any)=>{
  //     console.log(error)
  //   })
  // }

  // updateUser(){
  //   console.log(`update user`)
  // }

}
