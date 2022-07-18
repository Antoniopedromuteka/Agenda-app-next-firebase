import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { database } from '../services/firebase';
import { FormEvent, useState } from 'react';

const Home: NextPage = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [observacoes, setObservacoes] = useState('');


  function gravar(event: FormEvent){

    event.preventDefault();
    const ref = database.ref('contatos');

    const dados = {
      nome,
      email,
      telefone,
      observacoes
    }

    ref.push(dados);
  }


  return (
    <>
    <main className={styles.container}>
      <form onSubmit={gravar}>
        <input
           type="text" 
           placeholder='Nome'
           onChange={event => setNome(event.target.value)}
        />

        <input 
            type="email"  
            placeholder='Email' 
            onChange={event => setEmail(event.target.value)}
        />

        <input 
            type="tel" 
            placeholder='Telefone'
            onChange={event => setTelefone(event.target.value)} 
        />
        <textarea 
            placeholder="Observacao"
            onChange={event => setObservacoes(event.target.value)}
            >
              
        </textarea>

        <button 
            type="submit"
        >
          Salvar
        </button>
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
