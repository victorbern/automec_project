-- Criação da database com a adição da tabela OSDetalhes
CREATE DATABASE IF NOT EXISTS automec_v7;

USE automec_v7;

CREATE TABLE IF NOT EXISTS Cliente (
	idCliente INT NOT NULL AUTO_INCREMENT,
    nomeCliente VARCHAR(60),
    cpfCnpj VARCHAR(18) UNIQUE,
    celularCliente VARCHAR(20),
    telefoneCliente VARCHAR(20),
    cep VARCHAR(14),
    endereco VARCHAR(60),
    numero VARCHAR(6),
    bairro VARCHAR(60),
    cidade VARCHAR(60),
    uf VARCHAR(2),
    complemento VARCHAR(60),
    PRIMARY KEY (idCliente)
)engine innodb;

INSERT INTO Cliente (nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro, cidade, uf, complemento) VALUES
("Bento Diego Manoel Barros", "94336914826", "95994944203", "40362313", "69312307", "Rua Raimundo Penafort", "583", "Asa Branca", "Boa Vista", "RR", ""),
("Marli Sueli Castro", "15111254544", "62981034759", "40362424", "74355788", "Rua Vinícius de Aquino", "410", "Setor Orientville", "Goiânia", "GO", ""),
("Carolina Liz Rosa Duarte", "16821522782", "67985344414", "40364343", "79118210", "Rua Marquês de Maricá", "893", "Bairro São Francisco", "Campo Grande", "MS", ""),
("Matheus Davi Porto", "40762197080", "81988531790", "40362424", "53421347", "Travessa Setenta e Três", "137", "Maranguape II", "Paulista", "PE", ""),
("Lucas Nathan Figueiredo", "43885919800", "11986493322", "40363434", "05624040", "Rua Gonçalo Pires", "559", "Maranguape II", "São Paulo", "SP", "Vila Morse"),
("Olivia Débora Vitória Nascimento", "81997862301", "68984194060", "40362222", "69905232", "Avenida Epaminondas Jácome", "218", "Cadeia Velha", "Rio Branco", "AC", ""),
("Pietra e Louise Entregas Expressas Ltda", "27279793000186", "18985538620", "40369382", "19013900", "Rua Antônio Rodrigues 1024", "469", "Vila Industrial", "Presidente Prudente", "SP", ""),
("Nelson e Ayla Mudanças Ltda", "07122848000132", "11989276424", "40363940", "04635022", "Rua Palacete das Águias", "341", "Vila Alexandria", "São Paulo", "SP", "");

CREATE TABLE IF NOT EXISTS Funcionario (
	idFuncionario INT NOT NULL AUTO_INCREMENT,
    nomeFuncionario VARCHAR(60),
    isAtivo VARCHAR(3),
    funcao VARCHAR(45),
	PRIMARY KEY (idFuncionario)
)engine innodb;

INSERT INTO Funcionario (nomeFuncionario, isAtivo, funcao) VALUES
("Martin Rodrigo Anderson Nunes", "sim", "mecânico"),
("Francisco Juan Elias Nunes", "sim", "mecânico"),
("Luan Bryan Rodrigues", "sim", "mecânico");

CREATE TABLE IF NOT EXISTS Produto (
    codigoBarras VARCHAR(45) NOT NULL,
    descricao VARCHAR(45),
    valorCusto FLOAT,
    quantidadeEstoque INT,
    precoVenda FLOAT,
    PRIMARY KEY (codigoBarras)
)engine innodb;

INSERT INTO Produto (codigoBarras, descricao, valorCusto, quantidadeEstoque, precoVenda) VALUES
("25164531", "Óleo Lubrificante", 36.98, 16, 42.18),
("31649564", "Óleo para motor", 18.96, 45, 36.92),
("13469542", "Lava Auto Super Concentrado", 19.69, 69, 36.14);
-- SELECT * FROM OrdemServico WHERE idOrdemServico = 8;
-- UPDATE OrdemServico SET km = '12000', idCliente = '3', placaVeiculo = 'CAK3945' WHERE idOrdemServico = '8';
CREATE TABLE IF NOT EXISTS Servico (
	idServico INT NOT NULL AUTO_INCREMENT,
    descricaoServico VARCHAR(60),
    precoServico VARCHAR(45),
    PRIMARY KEY (idServico)
)engine innodb;

INSERT INTO Servico (descricaoServico, precoServico) VALUES
("Troca de óleo", 18.15),
("Limpeza", 35.69),
("Sangria de freios", 20.0);

CREATE TABLE IF NOT EXISTS Veiculo (
	placaVeiculo VARCHAR(8),
    marca VARCHAR(45),
    modelo VARCHAR(45),
    ano INT,
    capacidadeOleo DOUBLE,
    cor VARCHAR(45),
    idCliente INT,
    PRIMARY KEY (placaVeiculo),
    FOREIGN KEY (idCliente) REFERENCES Cliente (idCliente)
)engine innodb;

INSERT INTO Veiculo (placaVeiculo, marca, modelo, ano, capacidadeOleo, cor, idCliente) VALUES
("CAK3945", "Audi", "A1", 2011, 4, "Prata", 1),
("KDD7694", "Chery", "Celer Sedan", 2015, 4, "Branco", 2),
("APZ5450", "Porshe", "Cabriolet Carrera", 2022, 5, "Azul", 3),
("HPY4890", "Nissan", "Frontier", 2020, 4, "Branco", 4),
("CYS5439", "Fiat", "Argo", 2022, 5, "Branco", 5),
("LWL6723", "Fiat", "Cronos", 2021, 4, "Vermelho", 5);

CREATE TABLE IF NOT EXISTS Pagamento (
	idPagamento INT NOT NULL AUTO_INCREMENT,
    dataHora DATETIME,
    subtotal FLOAT,
    total FLOAT,
    desconto FLOAT, 
    formaPagamento VARCHAR(45),
    PRIMARY KEY (idPagamento)
)engine innodb;

CREATE TABLE IF NOT EXISTS OrdemServico (
	idOrdemServico INT AUTO_INCREMENT,
    total FLOAT,
    km INT,
    isFinalizada BOOLEAN DEFAULT FALSE,
    isPaga BOOLEAN DEFAULT FALSE,
    placaVeiculo VARCHAR(8),
    idCliente INT,
    PRIMARY KEY (idOrdemServico),
    FOREIGN KEY (idCliente) REFERENCES Cliente (idCliente)
)engine innodb;
-- SELECT * FROM OSDetalhes WHERE idOrdemServico = 1;
-- SELECT * FROM Produto_has_OSDetalhes;
-- SELECT p_osd.quantidade, p_osd.precoUnitario, p.codigoBarras, p.descricao FROM OSDetalhes AS osd 
-- INNER JOIN Produto_has_OSDetalhes AS p_osd ON p_osd.idOSDetalhes = osd.idOSDetalhes
-- INNER JOIN Produto AS p ON p.idProduto = p_osd.idProduto
-- WHERE osd.idOrdemServico = 7;

-- INNER JOIN OSDetalhes AS osd ON os.idOrdemServico = osd.idOrdemServico
-- INNER JOIN Produto_has_OSDetalhes AS p_osd ON osd.idOSDetalhes = p_osd.idOSDetalhes
-- INNER JOIN Produto AS p ON p.idProduto = p_osd.idProduto
-- INNER JOIN ExecutaFuncao AS ef ON ef.idOSDetalhes = osd.idOSDetalhes
-- INNER JOIN Servico AS s ON s.idServico = ef.idServico
-- INNER JOIN Funcionario AS f ON f.idFuncionario = ef.idFuncionario
-- WHERE osd.idOrdemServico = 6;
CREATE TABLE IF NOT EXISTS OSDetalhes (
	idOSDetalhes INT NOT NULL AUTO_INCREMENT,
    dataOS DATETIME,
    idOrdemServico INT,
    PRIMARY KEY (idOSDetalhes),
    FOREIGN KEY (idOrdemServico) REFERENCES OrdemServico (idOrdemServico)
)engine innodb;
INSERT INTO OrdemServico (total, km, idCliente, placaVeiculo) VALUES (1235, 13354, 1, 2);
INSERT INTO OSDetalhes (dataOS, idOrdemServico) VALUES (CURDATE(), 1);
-- SELECT idOSDetalhes, dataOS FROM OSDetalhes WHERE idOrdemServico = 1;
CREATE TABLE IF NOT EXISTS ExecutaFuncao(
	idOSDetalhes INT,
	idFuncionario INT,
    idServico INT,
    observacao VARCHAR(45),
    quantidade INT,
    PRIMARY KEY (idOSDetalhes, idFuncionario, idServico),
    FOREIGN KEY (idOSDetalhes) REFERENCES OSDetalhes (idOSDetalhes),
    FOREIGN KEY (idFuncionario) REFERENCES Funcionario (idFuncionario),
    FOREIGN KEY (idServico) REFERENCES Servico (idServico)
)engine innodb;

CREATE TABLE IF NOT EXISTS VendaDireta(
	idVendaDireta INT NOT NULL AUTO_INCREMENT,
    idPagamento INT,
    total FLOAT,
    dataHora DATETIME,
    PRIMARY KEY (idVendaDireta),
    FOREIGN KEY (idPagamento) REFERENCES Pagamento (idPagamento)
)engine innodb;

CREATE TABLE IF NOT EXISTS Produto_has_VendaDireta(
	codigoBarras VARCHAR(45),
    idVendaDireta INT,
    quantidadeVendida INT,
    precoTotal FLOAT,
	precoUnitario FLOAT,
    PRIMARY KEY (codigoBarras, idVendaDireta),
    FOREIGN KEY (codigoBarras) REFERENCES Produto (codigoBarras),
    FOREIGN KEY (idVendaDireta) REFERENCES VendaDireta (idVendaDireta)
)engine innodb;

CREATE TABLE IF NOT EXISTS Produto_has_OSDetalhes(
	idOSDetalhes INT,
    codigoBarras VARCHAR(45),
    quantidadeVendida INT,
    precoTotal FLOAT,
    precoUnitario FLOAT,
    PRIMARY KEY (idOSDetalhes, codigoBarras),
    FOREIGN KEY (idOSDetalhes) REFERENCES OSDetalhes (idOSDetalhes),
    FOREIGN KEY (codigoBarras) REFERENCES Produto (codigoBarras)
)engine innodb;

CREATE TABLE IF NOT EXISTS DetalhePagamento (
	idDetalhePagamento INT NOT NULL AUTO_INCREMENT,
    idOrdemServico INT,
    idPagamento INT,
    PRIMARY KEY (idDetalhePagamento),
    FOREIGN KEY (idPagamento) REFERENCES Pagamento (idPagamento)
)engine innodb;

-- Adição do atributo quantidadeVendida em Produto_has_VendaDireta
