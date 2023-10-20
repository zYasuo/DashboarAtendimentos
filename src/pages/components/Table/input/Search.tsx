import { Column } from 'react-table';
import { FiSearch } from 'react-icons/fi';

interface SearchFilterProps {
    filterInput: string;
    setFilterInput: (value: string) => void;
    selectedColumn: string;
    setSelectedColumn: (value: string) => void;
    columns: Column[];
}

export function SearchFilter({ filterInput, setFilterInput, selectedColumn, setSelectedColumn, columns }: SearchFilterProps) {
    return (
        <div className="flex justify-end items-center mb-4 flex-wrap">
            <div className="mr-4 my-1 text-slate-500">
                <label htmlFor="filterSelect ">
                    Filtrar por:
                </label>
                <select
                    id="filterSelect"
                    value={selectedColumn}
                    onChange={e => setSelectedColumn(e.target.value)}
                    className="ml-2 rounded p-1 bg-neutral-800 bg-opacity-50 text-white"
                    aria-label="Selecionar coluna para filtro"
                >
                    {columns.map(column => (
                        <option value={column.accessor as string} key={column.accessor as string}>
                            {column.Header as React.ReactNode}
                        </option>
                    ))}
                </select>
            </div>
            <div className="relative my-1">
                <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white" aria-hidden="true" />
                <input
                    value={filterInput}
                    onChange={e => setFilterInput(e.target.value)}
                    placeholder={`Buscar ${selectedColumn}...`}
                    className="pl-2 p-1 pr-8 rounded bg-neutral-800 bg-opacity-50"
                    aria-label={`Buscar por ${selectedColumn}`}
                />
            </div>
        </div>
    );
}
