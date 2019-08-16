import React, { useState } from 'react';
import '../styles/base.css'

const Afazeres = () => {
  const [itens, setItem] = useState([]);
  const [concluidos, setConcluidos] = useState([]);
  let antigoValorNaoFeito = []
  let antigoValorFeito = [] 
  const [error, setError] = useState(false);
  
  //Itens não feitos
  const adicionarItem = (e) => {
    e.preventDefault()
    const textBox = document.getElementById('item') 
    if(textBox.value === ''){
      setError(true)
    }
    else{
      antigoValorNaoFeito = itens.concat(textBox.value)
      setItem(antigoValorNaoFeito)
      textBox.value = ''  
      setError(false)
    }
  }
  
  const removerItem = (indexToRemove) => {
    const filtrado = itens.filter((value, index) => index !== indexToRemove)
    setItem(filtrado)
  }

  const removerItemFeito = (indexToRemove) => {
    const filtrado = concluidos.filter((value, index) => index !== indexToRemove)
    setConcluidos(filtrado)
  }

  //Itens que já foram feitos
  const adicionarFeitos = (indexToAdd) => {
    const filtrado = itens.filter((value, index) => index === indexToAdd)
    antigoValorFeito = concluidos.concat(filtrado)
    setConcluidos(antigoValorFeito)
    removerItem(indexToAdd)
  }
  

  const RenderizarAfazeres = () => {
    return (
      itens.map((item, index) => (
        <div className='afazeres' key={index}>
            {index + 1} - {item}
            <button className='button' onClick={() => adicionarFeitos(index)}>Já feito</button>
            <button className='button-remove' onClick={() => removerItem(index)}><span aria-hidden="true">&times;</span></button>
        </div>  
      ))
    )
  }

  const RenderizarFeitos = () => {
    return (
      concluidos.map((item, index) => (
        <div className='afazeres' key={index}>
          {index + 1} - {item}
          <button className='button-remove' onClick={() => removerItemFeito(index)}><span aria-hidden="true">&times;</span></button>
        </div>
      ))
    )
  }

  return (
    <div className='container'>
      {itens.length !== 0 && <h3>Taferas à fazer</h3>} 
      <RenderizarAfazeres/>

      {itens.length === 0 && <h3>Digite o que deseja fazer</h3>}
      {error && <h3>Por favor digite algo...</h3>}
      <form >
        <label htmlFor='things'>
        </label>
        <input className='input' type='text' id='item' placeholder='Digite o que quer fazer'></input>
        <button className='button' onClick={adicionarItem}>Adicionar</button>
      </form>

      {concluidos.length === 0 ? <h3>Você ainda não tem nenhuma tarefa feita...</h3> : <h3>Tarefas concluídas</h3>} 
      <RenderizarFeitos className='afazeres'/>
    </div>
  )
}

export default Afazeres;