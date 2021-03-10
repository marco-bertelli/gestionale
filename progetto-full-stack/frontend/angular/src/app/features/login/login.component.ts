import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private call:CallService,private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img'); 
  }

  login(username : string, password : string){
    console.log("Sono in login")
    this.call.getUser("utenti",username,password).subscribe(res=>{
      if(res.length==1)  {
        this.router.navigateByUrl('/dashboard?login=true');
      }
      //else window.alert("sbagliato")
      else this.toast.error('Utente non trovato , riprovare');
    });
  }
  

}
