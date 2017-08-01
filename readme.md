
# Laravel / Vue.js / Single Page Application Template

<strong>by:</strong> <a href="https://lnesi.github.io/">Luis Nesi</a> - <a href="https://twitter.com/lnesi">@lnesi</a>

Single Page Application template in Angular 2 with Angular Material.

## Fetures.
- Laravel Simple Auth
- User Invites 
- User System Extended with activations
- Bootstrap Front End.

## Requirements:
- MySQL
- PHP 
- Composer
- npm

## Installation
1.  Download or clone in your Machine
```
composer install
```
2. Create .env and DB details
3. Generate Key
```
php artisan key:generate
```
4. Migrate: 
Open The file 2014_10_12_000000_create_users_table in database/migrations and add the credentials desire for admin user.
```
php artisan migrate
```
5. Install Front End Packages
```
npm install
```
6. Serve
 ```
php artisan serve
```
7. Open browser http://127.0.0.1:8000

## Build and develop
```
npm run dev
 ```


### About Laravel

<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>


Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, yet powerful, providing tools needed for large, robust applications. A superb combination of simplicity, elegance, and innovation give you tools you need to build any application with which you are tasked.


## License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
