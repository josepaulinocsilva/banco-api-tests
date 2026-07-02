const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const { obterToken } = require("../helpers/autenticacao");
const postTransferencia = require("../fixtures/postTransferencia.json");

describe("Transferências", () => {
  let token;

  beforeEach(async () => {
    token = await obterToken("julio.lima", "123456");
  });

  describe("POST /transferencias", () => {
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

  describe("GET /transferencias/ {id}", () => {
    it("Deve retornar 200 e dados iguais ao registro de transferencia contido no banco quando o ID for válido", async () => {
      const resposta = await request(process.env.BASE_URL)
        .get("/transferencias/11")
        .set("Authorization", `Bearer ${token}`);

      console.log(resposta.status);
      console.log(resposta.body);

      expect(resposta.status).to.equal(200);
      expect(resposta.body.id).to.equal(11);

      expect(resposta.body.id).to.be.a("number");
      expect(resposta.body.conta_origem_id).to.equal(2);
      expect(resposta.body.conta_destino_id).to.equal(3);
      expect(resposta.body.valor).to.equal("2500.00"); // Valor da transferência não é string, é um number ($float)
      // expect(resposta.body.data_transferencia).to.be.a("string");
    });
  });

  describe("GET /transferencias", () => {
    it("Deve retornar 10 elementos na paginação quando informar limite 10 registros", async () => {
      const resposta = await request(process.env.BASE_URL)
        .get("/transferencias?page=1&limit=10")
        .set("Authorization", `Bearer ${token}`);

      console.log(resposta.status);
      console.log(resposta.body);

      expect(resposta.status).to.equal(200);
      expect(resposta.body.limit).to.equal(10);
      expect(resposta.body.transferencias).to.have.lengthOf(10);
    });
  });
});
