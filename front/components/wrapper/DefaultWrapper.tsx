'use client';


type Props = {
  children: React.ReactNode;
};

export default function DefaultWrapper ({ children }: Props) {


  return(
    <>
      {children}
    </>
  )
}