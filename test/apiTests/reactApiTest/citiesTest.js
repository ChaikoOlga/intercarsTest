const { spec,request } = require('pactum');
const { like } = require('pactum-matchers');
const ROUTE_GET_CITIES = "https://testapi.intercars.ru/api/v1/cities/get";
const ROUTE_FIND_CITIES = "https://testapi.intercars.ru/api/v1/cities/find";
let langRus = "RUS";
let langEng = "ENG";
request.setDefaultTimeout(10000);
describe("api tests cities get", function () {

    //Positive tests
    it('Get_cities_input_valid_data. Status 200/Json ', async () => {
        //arrange
        let page = 1;
        let count = 2;
        

        //action and assert
        await spec()
            .post(ROUTE_GET_CITIES)
            .withJson({
                "Page": page,
                "Count": count,
                "Lang": langRus,
            })
            .expectStatus(200)
            .expectJsonMatch(JSON)
            .expectJsonMatch('Result.Paging.ActivePage', page)
            .expectJsonMatch('Result.Paging.ObjectsToPage', count)

    })

    //try add number as string
    it('Get_cities_input_invalid_data_as_string. Status 200', async () => {
        //arrange
        let page = 1;
        let count = 2;

        await spec()
            .post(ROUTE_GET_CITIES)
            .withJson({
                "Page": page,
                "Count": count,
                "Lang": langRus
            })
            .expectStatus(400)

    })

    //Negative tests
    it('Get_badRequest_input_invalid_data. Status 400', async () => {
        //arrange
        let page = 100;
        let count = 2;

        await spec()
            .post(ROUTE_GET_CITIES)
            .withJson({
                "Page": page,
                "Count": count,
                "Lang": langRus
            })
            .expectStatus(400)
    })

    it('Get_badRequest_input_invalid_data_Type. Status 400', async () => {
        //arrange
        let page = "";
        let count = "";

        await spec()
            .post(ROUTE_GET_CITIES)
            .withJson({
                "Page": page,
                "Count": count,
                "Lang": langRus
            })
            .expectStatus(400)

    })
})

describe("api tests cities find", function () {

    //Positive tests
    it('Find_cities_input_valid_data. Status 200/Json ', async () => {
        //arrange
        let name = "Минск";
        let isExactly = true;

        //action and assert
        await spec()
            .post(ROUTE_FIND_CITIES)
            .withJson({
                "Name": name,
                "isExactly": isExactly,
                "Lang": langRus
            })
            .expectStatus(200)
            .expectJsonMatch(JSON)
            .expectJsonMatch('Result[0].Name', "Минск, Тестовые края")
            //.expectJsonMatch('Result[0].Name', like(RegExp("\bминск\b\i")))
    })
     
        //Positive tests
        it('Find_cities_input_valid_data. Status 200', async () => {
            //arrange
            let name = "Минск";
            let isExactly = false;
    
            //action and assert
            await spec()
            .post(ROUTE_FIND_CITIES)
            .withJson({
                "Name": name,
                "isExactly": isExactly,
                "Lang": langRus
            })
            .expectStatus(200)
            .expectJsonMatch(JSON)
            .expectJsonMatch('Result[0].Name', "Минск, Тестовые края")
            })

        //Negative tests
        it('Get_badRequest_input_null. Status 400', async () => {
            //arrange
            let name = null;
            let isExactly = true;
    
            //action and assert
            await spec()
            .post(ROUTE_FIND_CITIES)
            .withJson({
                "Name": name,
                "isExactly": isExactly,
                "Lang": langRus
            })
            .expectStatus(400)
            })

        
})


