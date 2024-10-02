// src/components/FilterComponent.tsx
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface FilterProps {
  searchName: string;
  searchPosition: string;
  setSearchName: (value: string) => void;
  setSearchPosition: (value: string) => void;
  handleFilter: () => void;
  handleClearFilter: () => void;
}

const FilterComponent: React.FC<FilterProps> = ({ searchName, searchPosition, setSearchName, setSearchPosition, handleFilter, handleClearFilter }) => {
  return (
    <div className="card mb-4 p-3">
      <h4>Filtros de busqueda</h4>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="nameFilter">Nombre:</label>
          <input type="text" id="nameFilter" className="form-control" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="positionFilter">Posicion:</label>
          <input type="text" id="positionFilter" className="form-control" value={searchPosition} onChange={(e) => setSearchPosition(e.target.value)} />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button onClick={handleFilter} className="btn btn-primary me-2">
            <FontAwesomeIcon icon={faSearch} /> Buscar
          </button>
          <button onClick={handleClearFilter} className="btn btn-secondary">
            <FontAwesomeIcon icon={faTimes} /> Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
