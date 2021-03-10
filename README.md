# Travel-app backend by RSSchool Team#43
Based on https://github.com/rolling-scopes-school/travel-app-be

npm run start:dev

### TO REFACTOR ###


## Деплой
 - [Деплой на хероку](https://travel-app-demo.herokuapp.com)  
 - Доступные эндпойнты:
    - ```/countries``` - список стран
    - ```/countries/{id}``` - детали о стране
    - ```/docs``` - swagger документация
 

## Локальный запуск
1. ```git clone https://github.com/rolling-scopes-school/travel-app-be.git```
2. Создайте файл .env в корне приложения
3. В созданном файе укажите переменные окружения:  
```MONGO_CONNECTION_STRING=<адрес вашей локальной или облачной mongodb>```
4. npm install
5. npm run start:dev

