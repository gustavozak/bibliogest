import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate,} from  '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = ( ) => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = ( ) => redirectLoggedInTo(['home']);
const routes: Routes = [
  {
    path: '',
    loadChildren: ( ) => 
    import( './login/login.module' ).then( (m) => m.LoginPageModule) ,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: ( ) => 
    import( './home/home.module' ).then( (m) => m.HomePageModule) ,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'bookmarks',
    loadChildren: () => import('./favoris/favoris.module').then( m => m.FavorisPageModule)
  },  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then( m => m.LibraryPageModule)
  },

  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
