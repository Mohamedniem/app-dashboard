import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {


const _PLATFORM_ID=inject(PLATFORM_ID)

// if(isPlatformBrowser(_PLATFORM_ID)){
//   // const token =localStorage.getItem('token') 
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjgyYjdiOGMxNDMzYTY2NmM4ZGU1ZTFiIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDc5NDIxODJ9.BbwcpYorvzNqmUmlZEDaZUqZMubgG52iq3J0HJquqCU'
//   if (localStorage.getItem('token')!==null) {
//     req=req.clone({
//       setHeaders:{Authorization: `Bearer ${token}`}
//       })
//     }

// }

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjgyYjdiOGMxNDMzYTY2NmM4ZGU1ZTFiIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDc5NDIxODJ9.BbwcpYorvzNqmUmlZEDaZUqZMubgG52iq3J0HJquqCU'
 
    req=req.clone({
      setHeaders:{Authorization: `Bearer ${token}`}
      })
    return next(req);
  
};
