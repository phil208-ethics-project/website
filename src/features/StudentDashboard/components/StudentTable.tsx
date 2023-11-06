import { useLiveQuery } from 'dexie-react-hooks'
import { FaRegTrashAlt } from 'react-icons/fa'

import { db, Student } from '../../../db'

function StudentRow({ student }: { student: Student }) {
  return (
    <tr
      className='bg-white border-b hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
      onClick={() => alert(`You clicked on student #${student.id}`)}
    >
      <td className='px-6 py-4'>{student.id}</td>
      <td className='px-6 py-4'>
        {student.first_name} {student.last_name}
      </td>
      <td className='pe-3'>
        <div
          className='hover:bg-gray-200 rounded-full p-2 aspect-square flex justify-center items-center'
          onClick={e => {
            e.stopPropagation()
            if (student.id) db.students.delete(student.id)
          }}
        >
          <FaRegTrashAlt />
        </div>
      </td>
    </tr>
  )
}

export default function StudentTable() {
  const students = useLiveQuery(() => db.students.toArray())
  return (
    <div className='w-full max-h-full overflow-y-auto rounded border-4 relative min-h-[100px]'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-200 sticky top-0'>
          <tr>
            <th className='px-6 py-3'>id</th>
            <th className='px-6 py-3'>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => (
            <StudentRow key={index} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
