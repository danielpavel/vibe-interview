import { FC } from 'react'

interface Props {

}

const MigrateTabContent: FC<Props> = ({ }) => {
  return (
    // <div className='p-5 bg-yellow-200 w-full'>
    //   This is Migrate Tab content
    // </div>
    <div className='flex p-20 w-full bg-yellow-100 justify-center'>
      <div className='w-3/4 px-24 py-5'>
        <div className='font-mono text-2xl mb-10'>
          Migrate
        </div>

        <div className='rounded-2xl bg-yellow-50 shadow-lg border'>
          <div className='flex h-[50px] items-center font-mono p-4'>
            <></>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MigrateTabContent