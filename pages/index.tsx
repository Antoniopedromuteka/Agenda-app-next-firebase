import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { database } from '../services/firebase';
import { FormEvent, useEffect, useState } from 'react';
import { type } from 'os';
 


type contatos ={
  chave:string,
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
  const [busca, setBusca] = useState<contatos[]>();

  const [estabuscando, setEstabuscando] = useState(false);
  const [chave, setChave] = useState('');

  const [atualizando, setAtualizando] = useState(false)

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

    limpa();
    
  }

  function limpa(){
    setNome('');
    setEmail('');
    setTelefone('');
    setObservacoes('');
  }

  function deletar(ref : string): void{
     database.ref(`contatos/${ref}`).remove();
  }

  function buscar(event: FormEvent){


    const palavra = event.target.value;

    if(palavra.length > 0){
      setEstabuscando(true)
  
   

    const dados = new Array;

    contato?.map(contato =>{
      const regra = new RegExp(event.target.value, "gi");

     if(regra.test(contato.nome)){
        dados.push(contato)
     }
    })

    setBusca(dados);

  }else{
    setEstabuscando(false);
  }
  }

  function editarDados(contato: contatos){

    setAtualizando(true);

    setChave(contato.chave);

    

    setNome(contato.nome);
    setEmail(contato.email);
    setTelefone(contato.telefone);
    setObservacoes(contato.observacoes);


  }

  function atualizarContato(){
    const ref = database.ref("contatos/");

    const dados = {
       'nome' : nome,
       'email' : email,
       'telfone': telefone,
       'observacoes': observacoes

    }

    ref.child(chave).update(dados);

    limpa();

    setAtualizando(false);

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
      <form>
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

      { atualizando ? 
        <button 
            type="button" 
            onClick={atualizarContato}    
        >
          Atualizar
        </button>

        : 

        <button 
          type="button" 
          onClick={gravar}


         >
         Salvar
        </button>



      }
      </form>

      <div className={styles.contactBox}>
        <input type="text" placeholder='Buscar' onChange={buscar} />
     

            
              {estabuscando ? busca?.map((contato) =>{

                return(
                  <div key={contato.chave} className={styles.CardBox}>
                   <div className={styles.BoxTitle}>
                    <p className={styles.titleName}>{contato.nome}</p>
                    <div className={styles.extras}>
                      <a onClick={()=> editarDados(contato)}>Editar</a>
                      <a href='#' onClick={()=> deletar(contato.chave)}>Excluir</a>

                    </div>
                   </div>

                    <div className={styles.datas}>
                    <p>{contato.email}</p>
                    <p>{contato.telefone}</p>
                    <p>{contato.observacoes}</p>
                    </div>

                  </div>
                )}) : contato?.map((contato) =>{

                  return(
                    <div key={contato.chave} className={styles.CardBox}>
                     <div className={styles.BoxTitle}>
                      <p className={styles.titleName}>{contato.nome}</p>
                      <div className={styles.extras}>
                        <a onClick={() => editarDados(contato)} >Editar</a>
                        <a href='#' onClick={() => deletar(contato.chave)}>Excluir</a>
  
                      </div>
                     </div>
  
                      <div className={styles.datas}>
                      <p>{contato.email}</p>
                      <p>{contato.telefone}</p>
                      <p>{contato.observacoes}</p>
                      </div>
  
                    </div>
                  )}
                )}                          
      </div>
    </main>
    </>
  )
}

export default Home
