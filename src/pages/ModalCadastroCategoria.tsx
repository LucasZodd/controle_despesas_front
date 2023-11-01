import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRequisicoesDespesas } from '../services/controleDespesas.service';

interface CadastroDespesaProps {
  onClose: () => void;
  showCategoriaModal: boolean;
}

const ModalCadastroCategoria: React.FC<CadastroDespesaProps> = ({ onClose, showCategoriaModal}) => {

  const [categoria, setCategoria] = useState('');

  const handleCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoria(event.target.value);
  };

  const handleClose = () => {
    onClose(); 
  };

  const { cadastroCategoria } = useRequisicoesDespesas();

  const handleSalvar = async () => {
    try {
      await cadastroCategoria(categoria);

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
      <Modal show={showCategoriaModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de categoria</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', textAlign:'center', justifyContent: 'center' }}>
            <label className="my-2 mx-2">Nome: </label>
            <input
              className="px-2"
              type="text"
              placeholder="Categoria"
              value={categoria}
              onChange={handleCategoriaChange}
            />
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

export default ModalCadastroCategoria;