const { spec,request } = require('pactum');
const { like } = require('pactum-matchers');
const ROUTE_POST_ACCOUNT_REGISTER = "https://testapi.intercars.ru/api/v1/account/register";


request.setDefaultTimeout(10000);

describe("api tests account register", async function () {

    //Positive tests
    //found bag "Message": "Ошибка получения данных."
    it('Account_register. Status 200.Json ', async () => {
           
        //arrange
            //action and assert
            await spec()
                .post(ROUTE_POST_ACCOUNT_REGISTER)
                .withJson({
                "Lang": "RUS",
                "UserName": "olga",
                "Password": "852852852Gg!",
                "ConfirmPassword": "852852852Gg!",
                "FirstName": "olga",
                "LastName": "chaiko",
                "MiddleName": "none",
            })
            .expectStatus(200)
            .expectJsonMatch(JSON)

        })


    //Negative tests
    //found bag 
    it('Account_register_short_password. Status 400.Json ', async () => {
        //arrange

        await spec()
            .post(ROUTE_POST_ACCOUNT_REGISTER)
            .withJson({
            "Lang": "RUS",
            "UserName": "olga",
            "Password": "852",
            "ConfirmPassword": "852",
            "FirstName": "olga",
            "LastName": "chaiko",
            "MiddleName": "none",
        })
        .expectStatus(400)
        .expectJsonMatch(JSON)
        .expectJsonMatch("Result", null)
        .expectJsonMatch("Error.Message","Пароль должен содержать не менее 8 символов")

    })
    //Negative tests
    //found bag 
    it('Account_register_password_without_letter. Status 400.Json ', async () => {
        //arrange

        await spec()
            .post(ROUTE_POST_ACCOUNT_REGISTER)
            .withJson({
            "Lang": "RUS",
            "UserName": "olga",
            "Password": "852998326!",
            "ConfirmPassword": "852998326!",
            "FirstName": "olga",
            "LastName": "chaiko",
            "MiddleName": "none",
        })
        .expectStatus(400)
        .expectJsonMatch(JSON)
        .expectJsonMatch("Result", null)
        .expectJsonMatch("Error.Message","Должна быть как минимум одна заглавная и одна строчная буква")

    })

//Negative tests
    //found bag 
    it('Account_register_password_without_numbers. Status 400.Json ', async () => {
        //arrange

        await spec()
            .post(ROUTE_POST_ACCOUNT_REGISTER)
            .withJson({
            "Lang": "RUS",
            "UserName": "olga",
            "Password": "olgaolgaolga!",
            "ConfirmPassword": "olgaolgaolga!",
            "FirstName": "olga",
            "LastName": "chaiko",
            "MiddleName": "none",
        })
        .expectStatus(400)
        .expectJsonMatch(JSON)
        .expectJsonMatch("Result", null)
        .expectJsonMatch("Error.Message","Должна быть как минимум 1 цифра")

    })

})
