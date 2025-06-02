import {useEffect, useState} from 'react'
import './App.css'

import fileService from "@/core/test/test";
import {HWMap} from "@/core/common/common.vo";

function App() {
	const [count, setCount] = useState(0)

    useEffect(() => {

        fileService.getFileList()
            .then((result:HWMap) => {
                console.log("🐬>> result ::: ", result)
            })
    }, [])
	
	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
				</a>
				<a href="https://react.dev" target="_blank">
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
