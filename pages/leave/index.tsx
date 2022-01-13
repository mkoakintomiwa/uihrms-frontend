import fs from "fs"
import path from "path"


export default function LeaveIndex(props: any){
    return (
        <div><b>{props.name} {props.title}</b> </div>
    )
}


export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
     
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    console.log(path.resolve(`./public/settings.json`));
    return {
      props: JSON.parse(fs.readFileSync(path.resolve(`./public/settings.json`)).toString()),
    }
  }