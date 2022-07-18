import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
    <main className={styles.main}>
      <form action="">
        <input type="text" name="" id="" placeholder='Nome' />
        <input type="email" name="" id="" placeholder='Email' />
        <input type="tel" name="" id="" placeholder='Telefone' />
        <textarea name="" id="" placeholder="Observacao"></textarea>
        <button type="submit">Salvar</button>
      </form>

      <div>
        <input type="text" placeholder='Buscar' />
      </div>
    </main>
    </>
  )
}

export default Home
