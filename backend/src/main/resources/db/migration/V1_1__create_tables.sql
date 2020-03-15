/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  andrei.mileto
 * Created: 11/03/2020
 */


CREATE TABLE IF NOT EXISTS cliente (
  id SERIAL NOT NULL,
  nome VARCHAR(200) NOT NULL,
  Endereco VARCHAR(200) NULL,
  telefone VARCHAR(200) NULL,
  email VARCHAR(200) NULL,
  status CHAR(1) NOT NULL,
  PRIMARY KEY (id));



-- -----------------------------------------------------
-- Table item
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS item (
  id SERIAL NOT NULL,
  nome VARCHAR(200) NOT NULL,
  vlr_unitario DOUBLE PRECISION NOT NULL,
  status CHAR(1) NOT NULL,
  PRIMARY KEY (id));



-- -----------------------------------------------------
-- Table forma_de_pagamento
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS forma_de_pagamento (
  id SERIAL NOT NULL,
  descricao VARCHAR(200) NOT NULL,
  status CHAR(1) NOT NULL,
  PRIMARY KEY (id));



-- -----------------------------------------------------
-- Table venda
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS venda (
  id SERIAL NOT NULL,
  id_cliente INT NOT NULL,
  id_forma_de_pagamento INT NOT NULL,
  data_venda DATE NOT NULL,
  status CHAR(1) NOT NULL,
  PRIMARY KEY (id),
  
  CONSTRAINT fk_venda_cliente1
    FOREIGN KEY (id_cliente)
    REFERENCES cliente (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_venda_forma_de_pagamento1
    FOREIGN KEY (id_forma_de_pagamento)
    REFERENCES forma_de_pagamento (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



-- -----------------------------------------------------
-- Table venda_item
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS venda_item (
  id_venda INT NOT NULL,
  id_item INT NOT NULL,
  qtd_vendida DOUBLE PRECISION NOT NULL,
  vlr_unitario DOUBLE PRECISION NOT NULL,
  vlr_total DOUBLE PRECISION NOT NULL,
  vlr_desconto DOUBLE PRECISION NOT NULL,
  PRIMARY KEY (id_venda, id_item),
  CONSTRAINT fk_venda_has_item_venda
    FOREIGN KEY (id_venda)
    REFERENCES venda (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_venda_has_item_item1
    FOREIGN KEY (id_item)
    REFERENCES item (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



-- -----------------------------------------------------
-- Table titulos_receber
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS titulos_receber (
  id SERIAL NOT NULL,
  venda_id INT NOT NULL,
  data_vencimento DATE NOT NULL,
  data_pagamento DATE NULL,
  num_parcela DOUBLE PRECISION NOT NULL,
  vlr_parcela DOUBLE PRECISION NOT NULL,
  vlr_total DOUBLE PRECISION NOT NULL,
  status CHAR(1) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_titulos_receber_venda1
    FOREIGN KEY (venda_id)
    REFERENCES venda (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table usuario
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL NOT NULL,
  nome VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  senha VARCHAR(250) NOT NULL,
  status CHAR(1) NOT NULL,
  PRIMARY KEY (id));

