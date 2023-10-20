import { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination, Row, TableState } from 'react-table'; // Add TableState to the import statement
import { Column } from 'react-table';
import { SearchFilter } from '../input/Search';
import { FiArrowDown, FiArrowUp, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface TableProps {
    columns: Column[];
    data: any[];
}

export function Table({ columns, data: initialData }: TableProps) {
    const [filterInput, setFilterInput] = useState('');
    const [selectedColumn, setSelectedColumn] = useState('nome');
    const [data, setData] = useState(initialData);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canNextPage,
        canPreviousPage,
        nextPage,
        previousPage,
        state: { pageIndex, pageSize }
    } = useTable<object>(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 } as { pageIndex: number } & Partial<TableState<object>>
        },
        useSortBy,
        usePagination
    ) as any;

    useEffect(() => {
        if (filterInput) {
            setData(
                initialData.filter(item =>
                    String(item[selectedColumn]).toLowerCase().includes(filterInput.toLowerCase())
                )
            );
        } else {
            setData(initialData);
        }
    }, [filterInput, selectedColumn, initialData]);

    return (
        <div>
            <SearchFilter
                filterInput={filterInput}
                setFilterInput={setFilterInput}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
                columns={columns}
            />

            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full">
                    <thead>
                        {headerGroups.map((headerGroup: any, index: number) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column: any) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id} className="py-2 px-4  text-slate-100 text-left text-sm font-bold">
                                        <div className="flex items-center">
                                            {column.render('Header')}
                                            <span className="ml-2">
                                                {column.isSorted ? (column.isSortedDesc ? <FiArrowDown /> : <FiArrowUp />) : null}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {page.map((row: Row<object>) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.column.id} className="py-2 px-4 border-b text-slate-300  border-slate-400">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex mt-4 justify-between items-center">
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="text-slate-400 hover:text-gray-600 disabled:opacity-50 flex items-center sm:text-sm md:text-base"
                >
                    <FiArrowLeft className="mr-2" />
                    Anterior
                </button>

                <span className="text-gray-50 sm:text-sm md:text-base">
                    Página {pageIndex + 1} de {Math.ceil(data.length / pageSize)}
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="text-slate-400 hover:text-gray-600 disabled:opacity-50 flex items-center sm:text-sm md:text-base"
                >
                    Próximo
                    <FiArrowRight className="ml-2" />
                </button>
            </div>
        </div>
    );
}
