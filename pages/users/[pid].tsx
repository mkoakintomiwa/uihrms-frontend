import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {

    const router = useRouter()
    const { pid } = router.query
    
    console.log(pid);
    
    return <div></div>
}

export default Home;