/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useRequisicoesDespesas } from "../services/controleDespesas.service";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ModalCadastroCategoria from "./ModalCadastroCategoria";
import ModalCadastroDespesa from "./ModalCadastroDespesa";

const Despesas = () => {
  const {
    getDespesas,
    buscarCategoria: categoriaFiltro,
    buscarData: dataFiltro,
  } = useRequisicoesDespesas();
  const [despesas, setDespesas] = useState<
    Array<{
      despesa_descricao: string;
      despesa_data: string;
      despesa_valor: number;
      despesa_categoria: string;
    }>
  >([]);
  const [buscarCategoria, setBuscarCategoria] = useState(5);
  const [buscarData, setBuscarData] = useState(["2023-10-30", "2023-10-31"]);

  const fetchDespesas = async () => {
    const { data } = await getDespesas();
    setDespesas(data);
  };

  useEffect(() => {
    fetchDespesas();
  }, []);

  const [showDespesaModal, setShowDespesaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);

  const handlePesquisarCategoria = async () => {
    try {
      const { data } = await categoriaFiltro(buscarCategoria);
      setDespesas(data);

    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
    }
  };

  const handlePesquisarData = async () => {
    try {
      const { data } = await dataFiltro(buscarData[0], buscarData[1]);
      setDespesas(data);

    } catch (error) {
      console.error("Erro ao pesquisarData:", error);
    }
  };

  return (
    <div>
      <h3>Despesas</h3>

      <div className="my-3">
        <Button variant="primary" onClick={handlePesquisarData}>
          Pesquisa por data
        </Button>
        <Button
          variant="primary"
          className="mx-2"
          onClick={handlePesquisarCategoria}
        >
          pesquisar por categoria
        </Button>
        <Button variant="primary" onClick={fetchDespesas}>
          Limpar Pesquisa
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa, index) => (
            <tr key={index}>
              <td>{despesa.despesa_descricao}</td>
              <td>{despesa.despesa_data}</td>
              <td>{despesa.despesa_valor}</td>
              <td>{despesa.despesa_categoria}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="my-3">
        <Button variant="primary" onClick={() => setShowDespesaModal(true)}>
          Cadastrar Despesa
        </Button>
        <Button
          variant="primary"
          className="mx-2"
          onClick={() => setShowCategoriaModal(true)}
        >
          Cadastrar Categoria
        </Button>
      </div>
      {showDespesaModal && (
        <ModalCadastroDespesa
          onClose={() => {
            setShowDespesaModal(false);
            fetchDespesas();
          }}
          showDespesaModal={showDespesaModal}
        />
      )}

      {showCategoriaModal && (
        <ModalCadastroCategoria
          onClose={() => setShowCategoriaModal(false)}
          showCategoriaModal={showCategoriaModal}
        />
      )}
    </div>
  );
};

export default Despesas;
