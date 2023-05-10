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
      className='h-[57px] w-full hover:opacity-50'
      {...props}
    >
      {children}
    </button>
  );
}

export default Tab;