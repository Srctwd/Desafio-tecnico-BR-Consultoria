import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);


function componentDidMount() {
       // Simple GET request using fetch
        fetch('https://localhost/vendas/1')
            .then(response => response.json())
            .then(data => this.setState({ totalReactPackages: data.total }));
    }

          return (
            <>
              <h1>Vite + React</h1>
              <div className="body">
                {totalReactPackages: data.total}
              </div>
            </>
          )
        };

export default App
