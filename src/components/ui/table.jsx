import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';
import { CardBody } from '@material-tailwind/react';
import React from 'react'

const TableForm = ({ handlePageChange, pagination, itemsPerPage, listItems, columns }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-4">
      <CardBody className="overflow-auto p-0">
        <table className="w-full min-w-[640px] table-auto border-collapse shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              {columns.map((el) => (
                <th
                  key={el.label}
                  className="py-4 px-5 text-left font-semibold text-sm uppercase tracking-wider"
                >
                  {el.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-900 text-sm">
            {listItems.data.map((item, key) => {
              return (
                <tr
                  key={item.id}
                  className={`border-b border-gray-200 ${key % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition cursor-pointer`}
                >
                  {columns.map((col, index) => (
                    <td key={index} className="py-4 px-5">
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg shadow-sm">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          title="Página anterior"
        >
          <BackwardIcon strokeWidth={2} className="h-5 w-5 text-inherit" />
        </button>
        <span className="text-sm text-white font-medium">
          Mostrando {(pagination.page - 1) * itemsPerPage + 1} - {Math.min(pagination.page * itemsPerPage, listItems.total)} de {listItems.total} registros
        </span>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= listItems.nroPages}
          title="Página siguiente"
        >
          <ForwardIcon strokeWidth={2} className="h-5 w-5 text-inherit" />
        </button>
      </div>
    </div>
  )
}

export default TableForm;
