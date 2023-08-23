import { Component } from '@angular/core';
import { DummyApiService } from '../dummy-api.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {
  pages: number[] = []
  currentPage: number = 1;
  users: any[] = [];

  constructor(
    private dummyApiService: DummyApiService) { }

  ngOnInit(): void {
    this.pages = []
    this.changePage(1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.dummyApiService.getUsers(this.currentPage).subscribe(
      (response) => {
        this.users = response.data;
        this.pagesNumber(response.total)
        this.users.sort((a, b) => {
          const firstNameA = a.firstName.toLowerCase();
          const firstNameB = b.firstName.toLowerCase();

          if (firstNameA < firstNameB) {
            return -1;
          }
          if (firstNameA > firstNameB) {
            return 1;
          }
          return 0;
        });
      },
      (error) => {
        alert(error)
      })
  }

  pagesNumber(total: number, usersPerPage: number = 5) {
    let numeroDePaginas = Math.floor(total / usersPerPage);
    if (total % usersPerPage == 0) {
      numeroDePaginas--
    }
    this.pages = Array.from({ length: numeroDePaginas }, (_, index) => index + 1);
  }

  deleteUser(id: any) {
    if (window.confirm('Tem certeza que quer deletar?')) {
      this.dummyApiService.deleteUser(id).subscribe(
        (response) => {
          this.changePage(this.currentPage)
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
