import { TestBed, async, inject } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { usersMock } from './mocks/usersMock';
import { User } from './models/User';
import { environment } from 'src/environments/environment';

describe('UsersService', () => {

    let service: UsersService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                UsersService
            ]
        });
        service = TestBed.get(UsersService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Testing the function getUsers()', () => {
        let req;
        let theUsers: User[];

        beforeEach(() => {
            service.getUsers().subscribe((users: User[]) => {
                theUsers = users;
            });
            req = httpMock.expectOne(`${environment.apiUrl}/users`);
            req.flush(usersMock);
        });

        it('Checking the url', () => {
            expect(req.request.url).toEqual('https://jsonplaceholder.typicode.com/users');
        });

        it('A GET type request must be verified', () => {
            expect(req.request.method).toBe('GET');
        });

        it('The response must be equal to what is in userMock', () => {
            expect(theUsers).toEqual(usersMock);
        });

        it('must return 10 users', () => {
            expect(theUsers.length).toBe(10);
        });
    });

    describe('Testing the function getUser()', () => {
        let theUser: User;
        let req;

        beforeEach(() => {
            service.getUser(3).subscribe((user: User) => {
                theUser = user;
            });
            req = httpMock.expectOne(`${environment.apiUrl}/users/3`);
            req.flush(usersMock[2]);
        });

        it('Must return the user id 3', () => {
            expect(theUser).toEqual(usersMock[2]);
        });

        it('Should be object User', () => {
            expect(Object.keys(theUser)).toEqual(['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company']);
        });
    });

    describe('Testing the function postUser', () => {
        let theUserCreated;
        let theError;
        let req;
        beforeEach(() => {
            delete usersMock[1].id;
            service.postUser(usersMock[1]).subscribe( userCreated => {
                theUserCreated = userCreated;
            },
            error => {
                theError = error;
            });
            req = httpMock.expectOne({
                url: `${environment.apiUrl}/users`,
                method: 'POST'
            });
            req.flush(usersMock[1]);
        });

        it('Response when the server fail', () => {
            delete usersMock[1].id;
            service.postUser(usersMock[1]).subscribe( userCreated => {},
            error => {
                theError = error;
            });
            req = httpMock.expectOne({
                url: `${environment.apiUrl}/users`,
                method: 'POST'
            });
            req.error({
                code: 500,
                msg: 'Ocurrio un fallo de conexion intentar mas tarde...'
            });

            expect(theError.error.code).toBe(500);
        });

        it('The reponse the post must be equals to userMock 1', () => {
            expect(theUserCreated).toEqual(usersMock[1]);
        });
    });
});
