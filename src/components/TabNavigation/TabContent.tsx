import { FC } from 'react'

interface Props {
  id?: any,
  children?: any
}

const TabContent: FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center align-middle'>
      {children}
    </div>
  );
}

export default TabContent