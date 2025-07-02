import React from 'react';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const ReportDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSelect = (report) => {
    onClose();
    if (report === 'mikrowisp') {
      navigate('/mikrowisp');
    } else if (report === 'ringbyname') {
      navigate('/ringbyname');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded p-6">
          <Dialog.Title className="text-lg font-bold">Seleccionar Reporte</Dialog.Title>
          <div className="mt-4">
            <button onClick={() => handleSelect('mikrowisp')} className="block w-full text-left p-2 hover:bg-gray-200">
              Reporte de Mikrowisp
            </button>
            <button onClick={() => handleSelect('ringbyname')} className="block w-full text-left p-2 hover:bg-gray-200">
              Reporte de Ring by Name
            </button>
          </div>
          <button onClick={onClose} className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
            Cancelar
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReportDialog;