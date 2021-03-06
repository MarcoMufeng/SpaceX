import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home( {launches} ) {
  console.log('launches',launches);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          SpaceX Launches
        </h1>

        <p className={styles.description}>
          Latest launches from SpaceX
        </p>

        <div className={styles.grid}>
          {launches.map(launch =>{
            return(
              <a key={launch.id} href={launch.links.video_link} className={styles.card}>
              <h3>{launch.mission_name}</h3>
              <p><strong>Launch Date:</strong> { new Date(launch.launch_date_local).toLocaleDateString("en-US") }</p>
            </a>
            )
          })}
          
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps(){
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  })

  const {data} = await client.query({
    query: gql`
    {
    launchesPast(limit: 10) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        video_link
        article_link
        mission_patch
      }
      rocket {
        rocket_name
      }
    }}`
  })

  return{
    props: {
      launches: data.launchesPast
    }
  }
}