import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import {UserServiceService} from '../user-service.service'
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { error } from 'console';
import {MatTableModule} from '@angular/material/table';
// import {UserFormComponent} from '../user-form/user-form.component'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {User} from "../../shared/models/user/model"
import { CommonModule,NgIf  } from '@angular/common';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule,NgIf ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  
  userDetails !: FormGroup;
  userObj : User = new User();
  userList : User[] = [];
  
  
  
  // private http = inject(HttpClient)

  constructor(private formBuilder : FormBuilder, private userService : UserServiceService) { }

  ngOnInit(): void {
    
    this.formIntialization();
    this.getAllUser()
    
    // this.userService.getUser().subscribe({
    //   next: (users: any)=>{
    //         // this.userList = users
    //         console.log(`fetching usersData sucessfully`)
    //   },
    //   error: (error)=> console.log(`error fetching`, error)
    // })
    
  }

  formIntialization(){
    this.userDetails = this.formBuilder.group({
      id:[0,Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      address:['',Validators.required]
  })
  }

 


  // addUser(){
  //   console.log(`add user`, this.userDetails)
  //   this.userObj.id = this.userDetails.value.id; 
  //   this.userObj.firstname = this.userDetails.value.firstname; 
  //   this.userObj.lastname = this.userDetails.value.lastname; 
  //   this.userObj.email = this.userDetails.value.email; 
  //   this.userObj.address = this.userDetails.value.address;
    
  //   this.userService.addUser(this.userObj).subscribe((res: any) =>{
  //     console.log(res)
  //   }, (error: any)=>{
  //     console.log(error)
  //   })
  // }

  getAllUser(){
    console.log(`get all user`)
    this.userService.GetAllUser().subscribe((res: any) =>{
     this.userList = res
      console.log(`data added`,res)
    }, (error: any)=>{
      console.log(error)
    })
    
  }

  DeleteUser(Id:number){
    
    console.log(`user deleted`)
    this.userService.deleteUser(Id).subscribe((res:any)=>{
      alert(`user deleted successfully`)
     this.getAllUser()
    })
  }

  getUsreEdit(user: User){
    console.log(`edit function click`, user)
    this.userDetails.controls['id'].setValue(user.id);
    this.userDetails.controls['firstname'].setValue(user.firstname);
    this.userDetails.controls['lastname'].setValue(user.lastname);
    this.userDetails.controls['email'].setValue(user.email);
    this.userDetails.controls['address'].setValue(user.address);

 
}

updateEmployee(id:any) {
console.log(this.userObj)
  this.userObj.id = this.userDetails.value.id;
  this.userObj.firstname = this.userDetails.value.firstname;
  this.userObj.lastname = this.userDetails.value.lastname;
  console.log(this.userObj.lastname)
  this.userObj.email = this.userDetails.value.email;
  this.userObj.address = this.userDetails.value.address;

  // this.userService.update(this.id, this.form.value) 
  this.userService.updateUser(this.userObj,id).subscribe((res:any)=>{
    alert(`user updated successfully`)
    this.getAllUser();
  },(error:any)=>{
    console.log(`fetching error`,error);
  })


}

}
