import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";


const BasicLayout = ({children,}: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  // 라우터
  const router = useRouter()

  return(
    <>
      <div>header</div>
      <div>
        {children}
      </div>
    </>
  )
}

export default BasicLayout