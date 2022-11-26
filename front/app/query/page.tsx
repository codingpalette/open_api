'use client';

import {userQuery, userQuery2} from "../../lib/apis/user";
import {useEffect} from "react";
import useInput from "../../hooks/useInput";
import Input from "../../components/base/Input";
import useDebounce from "../../hooks/useDebounce";


const Page = () => {
  const [value, onChangeValue] = useInput('')
  const debouncedFilter = useDebounce(value, 500);

  const { data } = userQuery2({text:debouncedFilter})


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