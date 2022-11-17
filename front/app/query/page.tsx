'use client';

import {userQuery} from "../../lib/apis/uaer";
import {useEffect} from "react";
import useInput from "../../hooks/useInput";
import Input from "../../components/base/Input";
import useDebounce from "../../hooks/useDebounce";


const Page = () => {
  const [value, onChangeValue] = useInput('')
  const debouncedFilter = useDebounce(value, 500);

  const { data } = userQuery({text:debouncedFilter, bb: 'b'})


  useEffect(() => {
    console.log(data)
  }, [data])

  return(
    <>
      <div>
        query test
      </div>

      <div>
        <Input type="text" value={value} onChange={onChangeValue}  />
      </div>
    </>
  )
}

export default Page;