const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const { obterToken } = require("../helpers/autenticacao");

describe("Transferências", () => {
  describe("POST /transferencias", () => {
    it("Deve retornar 201 quanto a transferencia for igual ou maior que 10,00", async () => {
      const token = await obterToken("julio.lima", "123456");

      const resposta = await request(process.env.BASE_URL)
        .post("/transferencias")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          contaOrigem: 1,
          contaDestino: 2,
          valor: 10.0,
          token: "",
        });

      expect(resposta.status).to.equal(201);

      console.log(resposta.status);
    });

    it("Deve retornar 422 quanto a transferencia for menor que 10,00", async () => {
      const token = await obterToken("julio.lima", "123456");

      const resposta = await request(process.env.BASE_URL)
        .post("/transferencias")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          contaOrigem: 1,
          contaDestino: 2,
          valor: 9.99,
          token: "",
        });

      expect(resposta.status).to.equal(422);

      console.log(resposta.status);
    });
  });
});
