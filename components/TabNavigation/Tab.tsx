import { FC, useEffect } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: any;
  children?: any;
}

const Tab: FC<Props> = ({ id, children, ...props }) => {

  // useEffect(() => {
  //   console.log('[Tab] with disabled', props.disabled);
  // }, [props]);

  return (
    <button
      id={id}
      className='h-[57px] rounded-[50px] border-[3px] border-black w-full'
      {...props}
    >
      {children}
    </button>
  );
}

export default Tab;