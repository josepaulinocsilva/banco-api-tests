const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const { obterToken } = require("../helpers/autenticacao");
const postTransferencia = require("../fixtures/postTransferencia.json");

describe("Transferências", () => {
  describe("POST /transferencias", () => {
    let token;

    beforeEach(async () => {
      token = await obterToken("julio.lima", "123456");
    });

    it("Deve retornar 201 quanto a transferencia for igual ou maior que 10,00", async () => {
      const bodyTransferencias = { ...postTransferencia };

      const resposta = await request(process.env.BASE_URL)
        .post("/transferencias")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(bodyTransferencias);

      expect(resposta.status).to.equal(201);

      console.log(resposta.status);
    });

    it("Deve retornar 422 quanto a transferencia for menor que 10,00", async () => {
      const bodyTransferencias = { ...postTransferencia };
      bodyTransferencias.valor = 7;

      const resposta = await request(process.env.BASE_URL)
        .post("/transferencias")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(bodyTransferencias);

      expect(resposta.status).to.equal(422);

      console.log(resposta.status);
    });
  });
});
