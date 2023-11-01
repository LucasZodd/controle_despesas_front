import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRequisicoesDespesas } from '../services/controleDespesas.service';

interface CadastroDespesaProps {
  onClose: () => void;
  showDespesaModal: boolean;
}

const ModalCadastroDesoesa: React.FC<CadastroDespesaProps> = ({ onClose, showDespesaModal}) => {

  const [despesa_descricao, setDescricao] = useState('');
  const [despesa_data, setData] = useState('');
  const [despesa_valor, setValor] = useState('');
  const [despesa_categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  const handleClose = () => {
    onClose(); 
  };

  const { cadastroDespesa, getCategorias } = useRequisicoesDespesas();

  const fetchCategorias = async () => {
    const { data } = await getCategorias()   
    setCategorias(data)
    console.log('Dados atualizados:', data);
  };

  useEffect(() => {
      fetchCategorias();
  }, []); 

  const handleSalvar = async () => {
    try {
      const form = {despesa_descricao, despesa_data, despesa_valor, despesa_categoria}
      await cadastroDespesa(form);

      setDescricao('');
      setData('');
      setValor('');
      setCategoria('');
      
      onClose();
      
    } catch (error) {

      console.error('Erro ao cadastrar categoria:', error);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={showDespesaModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Despesa</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', textAlign:'center', justifyContent: 'center' }}>
            <label className="my-1 mx-2">Descrição:</label>
            <textarea
              className="px-2"
              placeholder="Descrição"
              value={despesa_descricao}
              onChange={(event) => setDescricao(event.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="my-1 mx-2">Data:</label>
            <input
              className="px-2"
              type="date"
              placeholder="Data"
              value={despesa_data}
              onChange={(event) => setData(event.target.value)}
            />
          </div>
          <div>
            <label>Valor:</label>
            <input
              type="number"
              placeholder="Valor"
              value={despesa_valor}
              onChange={(event) => setValor(event.target.value)}
            />
          </div>
          <div>
            <label>Categoria:</label>
            <select
              value={despesa_categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.categoria_id} value={cat.categoria_nome}>
                  {cat.categoria_nome}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >Fechar</Button>
          <Button variant="primary" onClick={handleSalvar}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCadastroDesoesa;