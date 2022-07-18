import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { database } from '../services/firebase';
import { FormEvent, useEffect, useState } from 'react';
import { type } from 'os';


type contatos ={
  nome: string;
  email: string;
  telefone: string;
  observacoes: string
}


const Home: NextPage = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [observacoes, setObservacoes] = useState('');


  const [contato, setContato] = useState<contatos[]>();
  


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


    setNome('');
    setEmail('');
    setTelefone('');
    setObservacoes('');
  }

  useEffect(() =>{

    const refContatos = database.ref('contatos');


    refContatos.on('value', resultado =>{


     
      const resultadoContatos = Object.entries<contatos>(resultado.val() ?? {})
      .map(([chave, valor]) =>{
        return{
          'chave': chave,
          'nome': valor.nome,
          'email': valor.email,
          'telefone': valor.telefone,
          'observacoes': valor.observacoes

        }
      })

      setContato(resultadoContatos)
      
    }) 

  }, []);


  return (
    <>
    <main className={styles.container}>
      <form onSubmit={gravar}>
        <input
           type="text" 
           placeholder='Nome'
           value={nome}
           onChange={event => setNome(event.target.value)}
        />

        <input 
            type="email"  
            placeholder='Email'
            value={email}
            onChange={event => setEmail(event.target.value)}
        />

        <input 
            type="tel" 
            placeholder='Telefone'
            value={telefone}
            onChange={event => setTelefone(event.target.value)} 
        />
        <textarea 
            placeholder="Observacao"
            value={observacoes}
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
     
              {contato?.map((contato) =>(
                  <div className={styles.CardBox}>
                   <div className={styles.BoxTitle}>
                    <p className={styles.titleName}>{contato.nome}</p>
                    <div className={styles.extras}>
                      <a href="#">Editar</a>
                      <a href="#">Excluir</a>

                    </div>
                   </div>

                    <div className={styles.datas}>
                    <p>{contato.email}</p>
                    <p>{contato.telefone}</p>
                    <p>{contato.observacoes}</p>
                    </div>

                  </div>
               ))}
      </div>
    </main>
    </>
  )
}

export default Home
