
async function getData() {
  // const res = await fetch('http://localhost:8000/api/v1/users/test2', { cache: 'no-store', credentials: 'include' });

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, { cache: 'no-store' });

  console.log('aaaaaaa', res)

  const data = await res.json();
  return data;
}



const Page = async () => {
  const _userTest = await getData()
  console.log('user_test', _userTest)
  return (
    <>
      <div>test</div>
    </>
  );
};

export default Page;
