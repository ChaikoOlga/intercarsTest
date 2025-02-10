const { spec, request } = require('pactum');
const { like } = require('pactum-matchers');
const ROUTE_GET_CARRIERS = "https://testapi.intercars.ru/api/v1/carriers/getActive";
request.setDefaultTimeout(10000);

describe("api tests carriers get", async function () {


    it('Get_carriers. Status 200.Json ', async () => {
        await spec()
            .get(ROUTE_GET_CARRIERS)
            .expectStatus(200)
            .expectJsonMatch(JSON)

            .expectJsonMatch('Result[0].Id', 1)
            .expectJsonMatch('Result[0].Name', "Intercars")

            .expectJsonMatch('Result[1].Id', 2)
            .expectJsonMatch('Result[1].Name', "Белтранском")

            .expectJsonMatch('Result[2].Id', 3)
            .expectJsonMatch('Result[2].Name', "Busfor")

            .expectJsonMatch('Result[3].Id', 4)
            .expectJsonMatch('Result[3].Name', "Infobus")

            .expectJsonMatch('Result[4].Id', 5)
            .expectJsonMatch('Result[4].Name', "E-traffic")

            .expectJsonMatch('Result[5].Id', 7)
            .expectJsonMatch('Result[5].Name', "СКС авто")

            .expectJsonMatch('Result[6].Id', 9)
            .expectJsonMatch('Result[6].Name', "Lux Express")

            .expectJsonMatch('Result[7].Id', 11)
            .expectJsonMatch('Result[7].Name', "Unitiki")

            .expectJsonMatch('Result[8].Id', 17)
            .expectJsonMatch('Result[8].Name', "Рос-билет")

            .expectJsonMatch('Result[9].Id', 19)
            .expectJsonMatch('Result[9].Name', "Брянский автовокзал")

    })
})

