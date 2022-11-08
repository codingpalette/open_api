import styled from '@emotion/styled';
import tw from 'twin.macro';

interface ButtonProps {
  /** 버튼 안의 내용 */
  children: React.ReactNode;
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  // /** 버튼의 생김새를 설정합니다. */
  theme: 'primary' | 'secondary' | 'tertiary';
  // /** 버튼의 크기를 설정합니다 */
  // size: 'medium' | 'big';
  // /** 버튼을 비활성화 시킵니다. */
  // disabled?: boolean;
  // /** 버튼의 너비를 임의로 설정합니다. */
  // width?: string;
  // /** 버튼의 타입을 설정합니다. */
  // type?: 'button' | 'submit' | 'reset';
  // /** 클래스 네임 설정 */
  // className?: string;
  // // 로딩 설정
  // loadingActive?: boolean;
}

const Button = ({ children, onClick, theme }: ButtonProps) => {
  return (
    <>
      <Button2 onClick={onClick} theme={theme}>
        {children}
      </Button2>
    </>
  );
};

const Button2 = styled.button(({ theme }) => [
  tw`text-lg px-8 py-2 rounded focus:outline-none`,
  tw`transform transition-transform duration-75`,
  tw`hocus:(scale-105 text-yellow-400)`,
  theme && tw`bg-black text-white border-black`,
]);

export default Button;
