import { useState } from 'react'
import axios from 'axios'

function App(){
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const handleEncrypt = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/encrypt?text=${text}`)
      setResult(response.data.encrypted_code || response.data.encrypted_code)
    } catch (error){
      alert("Error: Is your Python backend running on port 8000?")
    }
  }
  const handleDecrypt = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/decrypt?secret_code=${text}`)
      setResult(response.data.decrypted_message || response.data.decrypted_message)
    } catch (error){
      alert("Error: Invalid code or server issue.")
    }
  }
 /*
 const handleClose = () => {
    setResult('')
  }

  const handleCopyandClose = () =>{
    navigator.clipboard.writeText(result)
    setResult('')
  }
  */

  return(
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial'}}>
    <h1> Secure Vault</h1>
    <p>Full Stack Python & React Project</p>
    
    <div style={{ marginTop: '20' }}>
      <input
      type='text'
      placeholder='Paste message or code here....'
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{padding: '12px', width: '350px', borderRadius: '5px', border: '1px solid #ccc'}}
      />
      </div>

      <div style={{ marginTop: '20px'}}>
        <button onClick={handleEncrypt} style={buttonStyle}>Encrypt</button>
        <button onClick={handleDecrypt} style={{ ...buttonStyle, backgroundColor: '#28a745'}}>Decrypt</button>
      </div>

      {result &&(
        <div style={{marginTop: '30px', padding: '20px', backgroundColor:'#f9f9f9', borderRadius: '10px', border: '1px solid #ddd'}}>
          <strong>Vault Output</strong>
          <p style={{ wordBreak: 'break-all', marginTop: '20px', background: '#f9f9f9', borderRadius: '10px', border: '1px solid #ddd'}}>
            {result}
          </p>
          <div style={{marginTop: '20px'}}>
            <button
              onClick={() => {navigator.clipboard.writeText(result); setResult('');}}
              style={{ padding: '8px 15px', marginRight: '10px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px'}}>
                Copy & Close
            </button>

            <button
              onClick={() => setResult('')}
              style={{ padding: '8px 15px', marginRight: '10px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px'}}>
                Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const buttonStyle = {
  padding: '10px 20px',
  margin: '0 10px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold'
}

const smallbuttonStyle = {
  padding: '8px 15px',
  margin: '0 5px',
  cursor: 'pointer',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 'bold'
}

export default App;