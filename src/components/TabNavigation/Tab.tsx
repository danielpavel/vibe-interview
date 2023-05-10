import { FC, useEffect } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: any;
  active?: boolean;
  children?: any;
}

const Tab: FC<Props> = ({ id, active, children, ...props }) => {

  return (
    <button
      id={id}
      className={`h-[57px] w-full hover:bg-slate-200 duration-500 font-mono ${active ? 'bg-slate-200 border-b-2 border-black' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Tab;