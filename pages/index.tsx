import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { database } from '../services/firebase';
import { useState } from 'react';

const Home: NextPage = () => {

  


  return (
    <>
    <main className={styles.container}>
      <form action="">
        <input type="text" name="" id="" placeholder='Nome' />
        <input type="email" name="" id="" placeholder='Email' />
        <input type="tel" name="" id="" placeholder='Telefone' />
        <textarea name="" id="" placeholder="Observacao"></textarea>
        <button type="submit">Salvar</button>
      </form>

      <div className={styles.contactBox}>
        <input type="text" placeholder='Buscar' />
        <div className={styles.CardBox}>
          <div className={styles.BoxTitle}>
          <p className={styles.titleName}>Carla Gomes Farias</p>
          <div className={styles.extras}>
            <a href="#">Editar</a>
            <a href="#">Excluir</a>

          </div>
          </div>

          <div className={styles.datas}>
          <p>Carla@gmail.com</p>
          <p>+244 923641906</p>
          <p>Amiga da Escola de Natação</p>
          </div>

        </div>
      </div>
    </main>
    </>
  )
}

export default Home
